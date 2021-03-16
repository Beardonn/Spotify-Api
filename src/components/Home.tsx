import React, { useEffect, useState } from "react";
import {
  generateCodeChallengeFromVerifier,
  generateCodeVerifier,
} from "../utils/CodeChallenge";

const Home = () => {
  const {
    REACT_APP_CLIENT_ID,
    REACT_APP_AUTHORIZE_URL,
    REACT_APP_REDIRECT_URL,
  } = process.env;
  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallengeFromVerifier(codeVerifier);
    window.location.href = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  };
  return (
    <div>
      <h1>SpotifyAPI</h1>
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Home;
