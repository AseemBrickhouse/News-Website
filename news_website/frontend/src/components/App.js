import React, { useEffect } from "react";
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
    // props.AllArticles(token, []);
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
    isAuthenticated: state?.auth?.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AutoTrySignUp: () => dispatch(authActions.authCheckState()),
    // AllArticles: (token, tags) => dispatch(articleActions.getARTICLES(token, tags)),
    SavedArticles: (token) => dispatch(savedAction.getSavedArticles(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
