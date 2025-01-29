import dotenv from "dotenv";
import path from "path";
const envPath =
  "C:/Users/Yuval-PC/Desktop/myCode/Projects/GmailEmulationApp/Server/.env";

const envPath2 =
  "C:/Users/Yuval-PC/Desktop/myCode/Projects/GmailEmulationApp/.env";

const setEnvPath = () => {
  dotenv.config({
    path: path.resolve(__dirname, envPath2),
  });
};

const getSecrets = () => {
  setEnvPath();
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const ClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (clientId && ClientSecret) return { clientId, ClientSecret };
    else throw new Error("no keys found");
  } catch (error) {
    console.log(error);
  }
};
setEnvPath();
const secrets = getSecrets();

export const googleClientId = secrets?.clientId
export const googleClientSecret = secrets?.ClientSecret
export const googleOauthRedirectUrl =
  "http://localhost:3001/users/api/sessions/oauth/google";

export default envPath;
