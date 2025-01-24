import { validate } from "class-validator";
import { UserDto } from "../dtos/userDtos.dto";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { RefreshTokenDto } from "../dtos/tokenDtos.dto";
import { getSecrets, regenerateAccessToken, setEnvPath } from "./utils";
import jwt from "jsonwebtoken";

export const validateDtoUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = plainToInstance(UserDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const constraints = errors.map((x) => x.constraints);
      res.status(400).json({
        constraints: constraints,
      });
    } else next(); //if no errors found continues on to the controller
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

export const validateDtoToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = plainToInstance(RefreshTokenDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const constraints = errors.map((x) => x.constraints);
      res.status(400).json({
        constraints: constraints,
      });
    } else next(); //if no errors found continues on to the controller
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

export const authenticateTokenFromHeader = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> | void => {
  const authorizaitonHeader = req.headers["authorization"]; //finds out if theres a bearer token in the header
  let token;
  
  if (authorizaitonHeader) {
    token = authorizaitonHeader.split(" ")[1];
  } else if (res.locals.auth.header) {
    token = res.locals.auth.header.split(" ")[1];
  } else {
    res.status(401).send("unauthorized");
    return;
  }

  setEnvPath();
  const secrets = getSecrets();
  if (!secrets?.secretKey) {
    res.status(500).send("server error");
    return;
  }
  


  jwt.verify(token, secrets.secretKey, (error: any) => {
    if (error) {
       res.status(401).send("unauthorizaed");
       return 
      }
    //AUTHENTICATED CONGRATULATIONS!
    next();

  });
};

export const extractCookiesAndInsertIntoHeader = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // here we need to check if the client sent cookies

  const cookies = req.cookies; // using cookies parser for simplicty
  

  if (!cookies || !cookies.refreshToken) {
    res.status(401).send("unauthorized");
    return;
  } // no cookies to be found meaning client has no tokens

  // or he lacks a refresh token meaning hes hasnt logged in properly
  // now that we know that the user has cookies we need check if he has an access token
  if (!cookies.token)
    // if he has no access token we are going to need to regenerate them an access token
    try {
      const newToken = await regenerateAccessToken(cookies.refreshToken);
      //now that we got a new token we need to insert it into the res.headers and next

      
      res.locals.auth = { header: `Bearer ${newToken}` };
      
      next();
      return;
    } catch (error) {
      console.log(error);
      res.status(401).send("unauthorized");
      return;
    }

  // here we know that we did get a cookie with an access token so we need to attach it the header and next
  // req.header("Authorization", `Bearer ${cookies.token}`);

  res.locals.auth = { header: `Bearer ${cookies.token}` };

  next();
  return;
};
