import React, { Component, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Home/Routes";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as articleActions from "../store/actions/article";
import * as savedAction from "../store/actions/savedArticles";

export const App = (props) => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    props.AutoTrySignUp();
    props.AllArticles(token);
    props.SavedArticles(token);
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Routes {...props} />
      </Router>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state.auth.account,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AutoTrySignUp: () => dispatch(authActions.authCheckState()),
    AllArticles: (token) => dispatch(articleActions.getARTICLES(token)),
    SavedArticles: (token) => dispatch(savedAction.getSAVEDARTICLES(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
