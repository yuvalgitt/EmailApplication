import { Request, Response } from "express-serve-static-core";
import { UserDto } from "../dtos/userDtos.dto";
import { UserService } from "../services/userService";
import { generateTokenAndRefreshTokenForLoginOnly } from "../utils/utils";
import jwt from "jsonwebtoken";
import { GoogleUser } from "../types/types";
import { error } from "console";

const userService = new UserService();

export class UserController {
  getHellowWorld(request: Request<{ name: string }>, response: Response) {
    const name = request.params.name;
    response.status(200).send(`hello ${name}`);
  }

  async googleOAuth(req: Request , res :Response): Promise<void> {
    //get code from the query string
    const code  = req.query.code as string
    const {id_token, access_token} = await userService.getGoogleOAuthTokens({code})
    // get ID and access token
    const googleUser : GoogleUser  = jwt.decode(id_token) as any
    if(!googleUser) {
      res.send('error')
      return
    }
    
    //get emails  with tokens
    try {
      
      const response = await userService.getInbox(googleUser , access_token)
      console.log(response);
      res.redirect("http://localhost:5173/feed")
    } catch (error) {
      
      console.log(error);
    }
    
    //upsert the user 

    // create sessions

    //create access & refresh token

    //set cookies

    //redirect to client
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
        res.send()
      } else res.status(401).send("unauthorized");
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
}
