import React from "react";
import { Route, Switch } from "react-router-dom";

import Articles from "./components/Dashboard/Articles";
// import ArticleDetail from "./components/Dashboard/ArticleDetailView";
import Login from "./components/Buttons/Login";
import SignUp from "./components/Buttons/SignUp";
import App from "./components/App";
import Home from "./components/HomePage";
import Account from "./components/Dashboard/AccountHome/Account";


const BaseRouter = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Articles" component={Articles} />
      {/* <Route exact path="/articles/:articleID/" component={ArticleDetail} />{" "} */}
      <Route exact path="/Login" component={Login} /> {" "}
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Account" component={Account}/>
    </Switch>
  </div>
);

export default BaseRouter;