import { googleClientId, googleOauthRedirectUrl } from "../config/config";

export const getGoogleAuthUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: googleOauthRedirectUrl,
    client_id: googleClientId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/gmail.readonly"
    ].join(" "),
  };

  console.log({ options });

  const queryString = new URLSearchParams(options);

  console.log(queryString.toString());

  return `${rootUrl}?${queryString.toString()}`;
};
