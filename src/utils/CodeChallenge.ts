import axios from "axios";

const dec2hex = (dec: number) => {
  return ("0" + dec.toString(16)).substr(-2);
};
export const generateCodeVerifier = () => {
  var array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  const codeVerifier = Array.from(array, dec2hex).join("");
  localStorage.setItem("code_verifier", codeVerifier);
  return codeVerifier;
};

const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const base64urlencode = (a: any) => {
  var str = "";
  var bytes = new Uint8Array(a);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

export async function generateCodeChallengeFromVerifier(v: string) {
  var hashed = await sha256(v);
  var base64encoded = base64urlencode(hashed);
  localStorage.setItem("code_challenge", base64encoded);
  return base64encoded;
}
