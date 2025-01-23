import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class UserDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(password: string, email: string) {
    this.password = password;
    this.email = email;
  }
}

export { UserDto };
