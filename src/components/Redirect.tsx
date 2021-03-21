import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { getAccessToken, getUserData } from "../service/LoginService";
import { useAppDispatch } from "../hooks/hooks";
import { setUserName, setAccessToken } from "../reducers/userReducer";

const Redirect = ({ location, history }: RouteComponentProps) => {
  console.log(location);
  console.log(history);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const afterLogin = async () => {
      const accessToken = await getAccessToken(
        location.search,
        "http://localhost:3000"
      );
      const userName = await getUserData();
      dispatch(setUserName(userName));
      dispatch(setAccessToken(accessToken));
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
