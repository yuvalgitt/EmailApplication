import { Request, Response } from "express-serve-static-core";
import { UserDto } from "../dtos/userDtos.dto";
import { UserService } from "../services/userService";
import { generateTokenAndRefreshTokenForLoginOnly } from "../utils/utils";

const userService = new UserService();

export class UserController {
  getHellowWorld(request: Request<{ name: string }>, response: Response) {
    const name = request.params.name;
    response.status(200).send(`hello ${name}`);
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
