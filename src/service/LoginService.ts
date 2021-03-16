import axios from "axios";
interface IAccessTokenResponseData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

async function createAccessToken(params: any) {
  const { REACT_APP_CLIENT_ID } = process.env;
  const parameters = new URLSearchParams({
    client_id: REACT_APP_CLIENT_ID,
    ...params,
  });
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    parameters
  );
  const data: IAccessTokenResponseData = response.data;
  const accessToken = data.access_token;
  const expires_at = Date.now() + 1000 * data.expires_in;

  localStorage.setItem("tokenSet", JSON.stringify({ ...data, expires_at }));

  return accessToken;
}
export const getAccessToken = async (code: string, url: string) => {
  const code_verifier = localStorage.getItem("code_verifier");
  const params = new URLSearchParams(code);
  await createAccessToken({
    grant_type: "authorization_code",
    code: params.get("code"),
    redirect_uri: `${url}/redirect`,
    code_verifier: code_verifier,
  });
};
export async function checkAccessToken() {
  let tokenSet = JSON.parse(localStorage.getItem("tokenSet") || "{}");

  if (!tokenSet) return;

  if (tokenSet.expires_at < Date.now()) {
    tokenSet = await createAccessToken({
      grant_type: "refresh_token",
      refresh_token: tokenSet.refresh_token,
    });
  }

  return tokenSet.access_token;
}
