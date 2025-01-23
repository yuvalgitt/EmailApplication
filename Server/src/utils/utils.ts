import { Request, Response } from "express-serve-static-core";
import pgClient from "../database/pg";
import { UserDto } from "../dtos/userDtos.dto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { TokenService } from "../services/tokenService";
import { UserService } from "../services/userService";

export const attmeptConnectionToDatabase = async () => {
  try {
    await pgClient.connect();
    console.log("connected", pgClient.database);
  } catch (error) {
    console.log(error);
  }
};
export const generateToken = async (
  req: Request<{}, {}, UserDto>,
  res: Response
) => {
  dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
  });
  const email = req.body.email;
  const key = process.env.ACCESS_TOKEN_SECRET;
  const refreshKey = process.env.REFRESH_TOKEN_SECRET

  if (key && refreshKey) {
    const accessToken = jwt.sign({ email }, key, { expiresIn: "15s" });
    const refreshToken = jwt.sign({email} , refreshKey)
    storeRefreshToken(req,refreshToken)
    res.status(200).send(`access ${accessToken} refresh :  ${refreshToken}`);
  } else {
    res.status(500).send("internal server error");
  }
};

const storeRefreshToken = async (req: Request, refreshToken: string) => {
  const tokenService = new TokenService();
  const userService = new UserService();
  const userid = await userService.getUserIdByEmail(req.body);
  tokenService.storeRefreshToken({ refreshToken, userid });
};
