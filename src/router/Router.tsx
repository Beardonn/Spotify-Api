import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Redirect from "../components/Redirect";
import Dashboard from "../components/Dashboard";
import PageWrapper from "../components/navbar/PageWrapper";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <PageWrapper>
        <main className='main'>
          <Switch>
            <Route path='/' component={Home} exact={true} />
            <Route path='/redirect' component={Redirect} />
            <Route path='/dashboard' component={Dashboard} />
            {/* <Route component={NotFoundPage} /> */}
          </Switch>
        </main>
      </PageWrapper>
    </BrowserRouter>
  );
};
export default AppRouter;
