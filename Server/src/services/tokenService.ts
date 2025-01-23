import { CreateRefreshTokenDto, RefreshTokenDto } from "../dtos/tokenDtos.dto";
import pgClient from "../database/pg";
import bcrypt from "bcrypt";

export class TokenService {
  async storeRefreshToken(createRefreshTokenDto: CreateRefreshTokenDto) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(createRefreshTokenDto.refreshToken, salt);

    const queryText = `
            insert into refreshTokens(refreshToken,userid)
            values($1,$2)
            returning userid
        `;
    const values = [hashed, createRefreshTokenDto.userid];

    try {
      const response = await pgClient.query(queryText, values);
      return `stored refreshToken for userid: ${response.rows[0].userid}`;
    } catch (error) {
      return error;
    }
  }

  async compareTokens(refreshTokenDto: RefreshTokenDto): Promise<Number> {
    const queryText = `
            select refreshtoken from refreshtokens
        `;
    const token = refreshTokenDto.token;

    try {
      const response = await pgClient.query(queryText);
      if (response.rows.length > 0) {
        const tokens = response.rows.map((x) => x.refreshtoken);
        for (let i = 0; i < tokens.length; i++) {
          if (await bcrypt.compare(token, tokens[i])) {
            return 200;
          }
        }
      }
      return 404;
    } catch (error) {
      return 500;
    }
  }
}
