import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Home/Routes";
import { connect } from "react-redux";
import * as authActions from "../store/actions/auth";
import * as savedAction from "../store/actions/savedArticles";
// import theme from "./ThemeWrapper";
// import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider, createTheme } from '@mui/material/styles';

//Yeah Still not sure why this doesnt work ...
const theme = createTheme({
  Typography: {
    fontFamily: [
      'Neue Haas Grotesk Display Pro',
      'sans-serif'
    ].join(','),
  }
});

export const App = (props) => {
  const token = localStorage?.getItem("token");
  useEffect(() => {
    props.AutoTrySignUp();
    props.SavedArticles(token);
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
    SavedArticles: (token) => dispatch(savedAction.getSavedArticles(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
