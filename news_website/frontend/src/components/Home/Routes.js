import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Header from "../Header/MainHeader/Header";
import ArticleID from "../ArticleView/ArticleID";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import AuthError from "../../Errors/AuthError";
import ArticleError from "../../Errors/ArticleError";
import SavedArticleError from "../../Errors/SavedArticleError";
import CreateArticle from "../CreateArticle/CreateArticle";
import AccountPage from "../Account/AccountPage";
import EditAccount from "../EditAccount/EditAccount";
import EditArticle from "../EditArticle/EditArticle";

const Routes = (props) => {
  return (
    <React.Fragment>
      <Router>
        <Header {...props} />
        <Switch>
          <Route exact path="/">
            <HomePage {...props} />
          </Route>
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Login" component={Login} />
          <Route
            exact
            path="/Account/CreateArticle"
            component={CreateArticle}
          />
          <Route exact path={"/Articles/:id"} component={ArticleID} />
          <Route exact path={"/Account/People/:key"} component={AccountPage} />
          <Route exact path="/AuthError" component={AuthError} />
          <Route exact path="/ArticleError" component={ArticleError} />
          <Route exact path="/Account/EditAccount" component={EditAccount}/>
          <Route
            exact
            path="/SavedArticleError"
            component={SavedArticleError}
          />
          <Route exact path={"/Articles/Edit/:key"}component={EditArticle}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default Routes;
