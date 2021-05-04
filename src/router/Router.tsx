import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Redirect from "../components/Redirect";
import Dashboard from "../components/Dashboard";
import User from "../components/User";
import TopTracks from "../components/TopTracks/TopTracksList";
import PageWrapper from "../components/navbar/PageWrapper";
import RecommendedList from "../components/RecommendedList";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <PageWrapper>
        <main className='main'>
          <Switch>
            <Route path='/' component={Home} exact={true} />
            <Route path='/redirect' component={Redirect} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/user' component={User} />
            <Route path='/top-tracks' component={TopTracks} />
            <Route path='/recommendations' component={RecommendedList} />
            {/* <Route component={NotFoundPage} /> */}
          </Switch>
        </main>
      </PageWrapper>
    </BrowserRouter>
  );
};
export default AppRouter;
