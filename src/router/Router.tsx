import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Redirect from "../components/Redirect";
import Dashboard from "../components/Dashboard";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className='main'>
        <Switch>
          <Route path='/' component={Home} exact={true} />
          <Route path='/redirect' component={Redirect} />
          <Route path='/dashboard' component={Dashboard} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default AppRouter;
