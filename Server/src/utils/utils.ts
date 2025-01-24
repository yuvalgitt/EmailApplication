import { NextFunction, Request, Response } from "express-serve-static-core";
import pgClient from "../database/pg";
import { UserDto } from "../dtos/userDtos.dto";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { TokenService } from "../services/tokenService";
import { UserService } from "../services/userService";
import envPath from "../config/config";
import { error } from "console";
import { stat } from "fs";

export const attmeptConnectionToDatabase = async () => {
  try {
    await pgClient.connect();
    console.log("connected", pgClient.database);
  } catch (error) {
    console.log(error);
  }
};
export const generateTokenAndRefreshTokenForLoginOnly = async (
  req: Request<{}, {}, UserDto>,
  res: Response
) => {
  dotenv.config({
    path: path.resolve(__dirname, envPath),
  });
  const email = req.body.email;
  const key = process.env.ACCESS_TOKEN_SECRET;
  const refreshKey = process.env.REFRESH_TOKEN_SECRET;

  if (key && refreshKey) {
    const accessToken = jwt.sign({ email }, key, { expiresIn: "1m" });
    const refreshToken = jwt.sign({ email }, refreshKey);
    storeRefreshToken(req, refreshToken);

    res.cookie("token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    return;
  } else {
    res.status(500).send("internal server error");
  }
  return res.status(500).send("internal server error");
};

const storeRefreshToken = async (req: Request, refreshToken: string) => {
  const tokenService = new TokenService();
  const userService = new UserService();
  const userid = await userService.getUserIdByEmail(req.body);
  tokenService.storeRefreshToken({ refreshToken, userid });
};

export const setEnvPath = () => {
  dotenv.config({
    path: path.resolve(__dirname, envPath),
  });
};

export const getSecrets = () => {
  setEnvPath();
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const refreshKey = process.env.REFRESH_TOKEN_SECRET;
    if (secretKey && refreshKey) return { secretKey, refreshKey };
    else throw new Error("no keys found");
  } catch (error) {
    console.log(error);
  }
};

export const regenerateAccessToken = async (refreshToken : string) => {
//this function receives a refresh token and generates a new access token based on verifications results
    setEnvPath()
    const secrets = getSecrets()
    if(!secrets?.refreshKey) return Error("missing keys")
    //now we have both the refreshToken and the secret refresh key
    // 1st we need to check if the token even matches our key and then we need to check the datebase for a match

    //first of all lets check for a match on the database
    
    const tokenService = new TokenService()
    
    const status = await tokenService.compareTokens({token : refreshToken})
    if(status === 404 || status === 500) return error
    //now that we know that theres a match we can proceed to signing and returning a new token

     const newToken = jwt.verify(refreshToken , secrets.refreshKey , async (error , payload : any )=> {
      if(error) return error
      const email = payload.email
      const newToken = await jwt.sign({email} , secrets.secretKey, {expiresIn : "1m"})
      
      return newToken
    })
    return newToken
}







// export const getBearerTokenFromHeader = (
//   // this function is for postman usage
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//     if (req.headers["authorization"]) {
//         const authorizaitonHeader = req.headers["authorization"];
//     console.log(authorizaitonHeader);
//     const token = authorizaitonHeader.split(" ")[1];
//     const secretKey = process.env.ACCESS_TOKEN_SECRET;
//     if (secretKey) {
//         jwt.verify(token, secretKey, (error) => {
//             // verifys if the jWT is matching the key
//             if (error) return res.status(401).send("unauthorized");
//             next();
//           });
//         } else {
//             res.status(401).send("unauthorized");
//           }
//         }
//       };
      
      // export const regenerateAccessToken = (
        //   req: Request,
        //   res: Response,
        //   next: NextFunction
        // ) => {
          //   if (!req.cookies.token) {
            //     //if token expired
            //     const refreshKey = process.env.REFRESH_TOKEN_SECRET;
            //     const refreshToken = req.cookies.refreshToken;
            
//     console.log(req.cookies.refreshToken);

//     if (refreshKey && refreshToken) {
  //       jwt.verify(refreshToken, refreshKey, (error: jwt.VerifyErrors | null) => {
    //         if (error) return res.status(401).send("unauthorized");
    //         //here we need to generate a new token for the client
    //         generateNewAccessToken(req.body.email, res, next); // the funciton responds with the new token
    //       });
    //     } else res.status(500).send("internal server error");
    //   } else {
      //     res.status(400).send("bad request");
      //   }
      // };
      
      // export const generateNewAccessToken = async (
      //   email: string,
      //   res: Response,
      //   next: NextFunction
      // ) => {
      //   dotenv.config({
      //     path: path.resolve(__dirname, envPath),
      //   });
      //   const key = process.env.ACCESS_TOKEN_SECRET;
      //   try {
      //     if (key) {
      //       const accessToken = jwt.sign({ email }, key, { expiresIn: "1m" });
      //       res.cookie("token", accessToken, {
      //         httpOnly: true,
      //         sameSite: "strict",
      //         maxAge: 1000 * 60,
      //       });
      //       res.send();
      //     } else throw new Error("error");
      //   } catch (error) {
      //     res.send(error);
      //     console.log(error);
      //   }
      // };
