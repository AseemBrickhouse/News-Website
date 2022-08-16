import React from "react";
import { Route } from "react-router-dom";

import Articles from "./components/Dashboard/Articles";
// import ArticleDetail from "./components/Dashboard/ArticleDetailView";
import Login from "./components/Buttons/Login";
import SignUp from "./components/Buttons/Signup";
import App from "./components/App";
import Home from "./components/HomePage";
const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/Articles" component={Articles} />
    {/* <Route exact path="/articles/:articleID/" component={ArticleDetail} />{" "} */}
    <Route exact path="/Login" component={Login} /> {" "}
    <Route exact path='/SignUp' component={SignUp} />
  </div>
);

export default BaseRouter;