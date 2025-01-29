const serverUrl: string = "http://localhost:3001";

const getSecrets = () => {
  try {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const ClientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    if (clientId && ClientSecret) return { clientId, ClientSecret };
    else throw new Error("no keys found");
  } catch (error) {
    console.log(error);
  }
};
const secrets =  getSecrets();


export const googleClientId = secrets?.clientId;
export const googleClientSecret = secrets?.ClientSecret;

export const googleOauthRedirectUrl =
  "http://localhost:3001/users/api/sessions/oauth/google";
export const EmailAppRedirectUrl = "http://localhost:5137/feed";

export default serverUrl;
