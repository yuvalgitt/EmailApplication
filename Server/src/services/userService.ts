import pgClient from "../database/pg";
import { UserDto } from "../dtos/userDtos.dto";
import bcrypt from "bcrypt";

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

  async getUserIdByEmail(userDto : UserDto) {
    const queryText = `
      select userid from users
      where email = $1
    `
    try {
      const response = await pgClient.query(queryText,[userDto.email])
      if(response.rows.length > 0)
        return response.rows[0].userid
      console.log('no user found with matching email');

    } catch (error) {
      return error
    }
  }
}
