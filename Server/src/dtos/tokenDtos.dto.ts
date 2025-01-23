import { IsNotEmpty, IsString } from "class-validator";

export class CreateRefreshTokenDto {
    refreshToken : string;
    userid : number;

    constructor(refreshToken : string, userid : number) {
        this.refreshToken = refreshToken
        this.userid  = userid
    }
}

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    token : string;

    constructor(token : string) {
        this.token = token
    }
}