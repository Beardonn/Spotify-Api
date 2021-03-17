import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  generateCodeChallengeFromVerifier,
  generateCodeVerifier,
} from "../utils/CodeChallenge";
import "../styles/home.scss";

const Home = ({ history }: RouteComponentProps) => {
  useEffect(() => {
    if (localStorage.getItem("tokenSet")) {
      history.push("/dashboard");
    }
  }, [history]);
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
    <section className='home-container'>
      <h1 className='home-container__title'>SpotifyAPI</h1>
      <button
        onClick={() => {
          handleLogin();
        }}
        className='home-container__login-button'
      >
        Login
      </button>
    </section>
  );
};

export default Home;
