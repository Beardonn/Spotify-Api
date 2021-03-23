import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import Router from "./router/Router";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
