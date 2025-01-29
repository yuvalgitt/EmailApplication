import { Request, Response } from "express-serve-static-core";
import { UserDto } from "../dtos/userDtos.dto";
import { UserService } from "../services/userService";
import { generateTokenAndRefreshTokenForLoginOnly } from "../utils/utils";
import jwt from "jsonwebtoken";
import { GoogleUser } from "../types/types";

const userService = new UserService();

export class UserController {

  async getMessageData(req : Request, res : Response) {
    try {
      const cookies = req.cookies
      const messageId = req.params.id
      if(!cookies) {
        res.send("unauthorized")
        return
      }

      const messageData = await userService.getMessageData(cookies.accessTokenGoogle , messageId)
      res.json(messageData).status(200)
    } catch (error) {
      res.send(error)
    }
  }

  async getGmailInbox(req: Request, res: Response): Promise<void> {
    try {
      const cookies = req.cookies;
      if (!cookies) {
        res.send("unauthorized").status(401);
        return;
      }
      
      const messageArray = await userService.getInbox(cookies.accessTokenGoogle);
      res.json(messageArray);
    } catch (error) {
      res.send(error);
    }
  }

  async googleOAuth(req: Request, res: Response): Promise<void> {
    try {
      const code = req.query.code as string;
      const { id_token, access_token, refresh_token } =
        await userService.getGoogleOAuthTokens({
          code,
        });
        
      // get ID and access token
      const googleUser: GoogleUser = jwt.decode(id_token) as any;
      if (!googleUser) {
        res.send("error");
        return;
      }
      res.cookie("refreshTokenGoogle", refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
      res.cookie("accessTokenGoogle", access_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      });
      res.redirect("http://localhost:5173/feed");
    } catch (error) {
      res.send(`error : ${error}`);
    }
    //get code from the query string
  }

  async createUser(req: Request<{}, {}, UserDto>, res: Response) {
    const body = req.body;
    try {
      const data = await userService.createUser(body);
      res.status(200).send(data);
    } catch (error) {
      res.status(500);
    }
  }

  async logInUser(req: Request<{}, {}, UserDto>, res: Response) {
    const body = req.body;
    try {
      const data: number = await userService.logInUser(body);
      if (data === 200) {
        await generateTokenAndRefreshTokenForLoginOnly(req, res); // returns the access token to the client
        res.send();
      } else res.status(401).send("unauthorized");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
}
