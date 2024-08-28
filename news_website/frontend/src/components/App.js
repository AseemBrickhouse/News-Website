import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Home/Routes";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as savedAction from "../store/actions/savedArticles";

import { ThemeProvider } from "@mui/material";
// import { ThemeProvider } from "@material-ui/styles";
// import { ThemeProvider } from "@material-ui/styles";

//Yeah Still not sure why this doesnt work ...
import ThemeWrapper from "../Themes/Themes";
import { Button } from "@mui/material";

export const App = (props) => {
  const token = localStorage?.getItem("token");
  useEffect(() => {
    props.AutoTrySignUp();
  }, []);

  useEffect(() => {
    if (props.account.key !== undefined)
      props.SavedArticles(props.account.key, token);
  }, [props.account]);
  return (
    <ThemeProvider theme={ThemeWrapper}>
      <React.Fragment>
        <Router>
          <Routes {...props} />
        </Router>
      </React.Fragment>
    </ThemeProvider>
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
    SavedArticles: (account_id, token) =>
      dispatch(savedAction.getSavedArticles(account_id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
