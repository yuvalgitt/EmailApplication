import { validate } from "class-validator";
import { UserDto } from "../dtos/userDtos.dto";
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt from "jsonwebtoken";
import { RefreshTokenDto } from "../dtos/tokenDtos.dto";

export const validateDtoUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
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

export const authenticateToken = (
  req: Request<{}, {}, UserDto>,
  res: Response,
  next: NextFunction
) => {
  if (req.headers["authorization"]) {
    const authorizaitonHeader = req.headers["authorization"];
    const token = authorizaitonHeader.split(" ")[1];
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    if (secretKey) {
      jwt.verify(token, secretKey, (error) => { // verifys if the jWT is matching the key
        if (error) return res.status(401).send("unauthorized");
        next();
      });
    } else {
      res.status(401).send("unauthorized");
    }
  } else {
    res.status(400).send("bad request");
  }
};
