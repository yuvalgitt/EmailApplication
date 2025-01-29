import qs from "querystring";
import pgClient from "../database/pg";
import { UserDto } from "../dtos/userDtos.dto";
import bcrypt from "bcrypt";
import {
  googleClientId,
  googleClientSecret,
  googleOauthRedirectUrl,
} from "../config/config";
import axios from "axios";
import { GoogleTokensResult, GoogleUser } from "../types/types";
import Imap from "imap";

export class UserService {
  async createUser(userDto: UserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userDto.password, salt);

    const values = [userDto.email, hashed];
    const queryText = `insert into users(email,password) values($1,$2) returning email`;

    try {
      const response = await pgClient.query(queryText, values);
      return `Successfuly created email of ${response.rows[0].email}`;
    } catch (error) {
      return error;
    }
  }

  async logInUser(userDto: UserDto): Promise<number> {
    const queryText = `select password from users where email=$1`;
    try {
      const response = await pgClient.query(queryText, [userDto.email]);

      if (response.rows.length === 0) return 404;
      // console.log(` ${userDto.password}   compare  ${response.rows[0].password}`);
      if (await bcrypt.compare(userDto.password, response.rows[0].password)) {
        return 200;
      }
      return 401;
    } catch (error) {
      console.log(error);
      return 500;
    }
  }

  async getUserIdByEmail(userDto: UserDto) {
    const queryText = `
      select userid from users
      where email = $1
    `;
    try {
      const response = await pgClient.query(queryText, [userDto.email]);
      if (response.rows.length > 0) return response.rows[0].userid;
      console.log("no user found with matching email");
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  async getGoogleOAuthTokens({
    code,
  }: {
    code: string;
  }): Promise<GoogleTokensResult> {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      redirect_uri: googleOauthRedirectUrl,
      grant_type: "authorization_code",
    };

    try {
      const res = await axios.post<GoogleTokensResult>(
        url,
        qs.stringify(values),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return res.data;
    } catch (error: any) {
      console.log(error, " failed to fetch google Oauth tokens");
      throw new Error(error.message);
    }
  }

  async getMessageData(access_token: string, messageId: string) {
    try {
      if (!access_token) {
        throw new Error("no token found");
      }
      const response = await axios.get(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
          // params: { q: "is:unread" }, // Search for unread emails
        }
      );
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log("error fetching message data");

      return error;
    }
  }

  async getInbox(access_token: string) {
    try {
      if (!access_token) {
        throw new Error("no token found");
      }
      const response = await axios.get(
        "https://www.googleapis.com/gmail/v1/users/me/messages",
        {
          headers: { Authorization: `Bearer ${access_token}` },
          // params: { q: "is:unread" }, // Search for unread emails
        }
      );
      console.log(response.data.messages);

      return response.data.messages;
    } catch (error: any) {
      console.error(
        "Error fetching emails:",
        error.response?.data || error.message
      );
    }
  }
}
