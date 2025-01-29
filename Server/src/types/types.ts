export interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export interface GoogleUser {
  email: string;
  email_verified : boolean
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

// export interface Oauth2Config {
//   user: string ,
//   xoauth2: string, // Use the access token
//   host: string,
//   port: number,
//   tls: boolean,
// }