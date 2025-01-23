import { Request, Response } from "express-serve-static-core";
import { TokenService } from "../services/tokenService";
import { RefreshTokenDto } from "../dtos/tokenDtos.dto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

const tokenService = new TokenService();

export const genNewToken = async (
  req: Request<{}, {}, RefreshTokenDto>,
  res: Response
) => {
  dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
  });

  const token = req.body.token;

  const refreshKey = process.env.REFRESH_TOKEN_SECRET;
  const secretKey = process.env.ACCESS_TOKEN_SECRET;
  if (!refreshKey||  !secretKey) { 
    res.status(500).send("internal server error");
    return
  }
  try {
    const data = await tokenService.compareTokens({ token: token });
    if (data !== 200) { 
        res.status(400).send("invalid token");
        return
    }
    
    jwt.verify(token, refreshKey, (error, user : any) => {
        if(error) {
           res.status(401).send('unauthorized')
           return
        }
        const email = user.email
        const newToken = jwt.sign({email : email} , secretKey, { expiresIn: "15s" })
        res.send(newToken)
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).send('internal server error');
  }
};
