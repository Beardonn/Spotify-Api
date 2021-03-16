import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { getAccessToken } from "../service/LoginService";

const Redirect = ({ location, history }: RouteComponentProps) => {
  console.log(location);
  console.log(history);
  useEffect(() => {
    const afterLogin = async () => {
      await getAccessToken(location.search, "http://localhost:3000");
      history.push("/dashboard");
    };
    afterLogin();
  }, [location.search, history]);
  console.log(location);
  return (
    <div>
      <h1>Redirect</h1>
    </div>
  );
};

export default Redirect;
