import React, { useState, useEffect, } from "react";
import * as actions from "../../store/actions/auth";
import { withRouter, Link,} from "react-router-dom";
import { connect } from "react-redux";
import { 
  Box, 
  TextField, 
  Button, 
  Container, 
  styled 
} from "@material-ui/core";
import "./css/Login.css";
import Loading from "./Loading";
import { Alert } from "@mui/material";

const StyledButton = styled(Button)({
  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
  color: "black",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "bold",
  textTransform: "none",
  textDecoration: "none",
});

const Login = ({ error, onAuth, history, auth }) => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (auth.token != null && error == null) {
      history.push("/");
    }
  }, [load]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoad(true);
    await onAuth(data.get("email"), data.get("password"));
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  };
  return (
    <>
      {load ? (
        <Loading />
      ) : (
        <Box>
          <Container component="main">
            <Box className="main-container-box">
              <Box className="main-container-box-left">
                <Box
                  component="h1"
                  variant="h5"
                  style={{ marginLeft: ".25vw", fontSize: "150px" }}
                >
                  Lorem
                </Box>
                <Box sx={{ marginLeft: "1vw" }}>
                  <p className="main-container-box-left-subtext">
                    Here, words dance across the digital canvas, weaving
                    stories, insights, and ideas that ignite your imagination
                    and fuel your passion for life.
                  </p>
                </Box>
              </Box>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                className="main-container-box-right"
              >
                <Box className="main-container-box-right-header">
                  <Box sx={{ marginLeft: "" }}>
                    <div className="main-container-box-right-header-text">
                      Login to Your Account
                    </div>
                    {error != null && (
                      <Alert severity="error" variant="outlined">
                        <strong>Error</strong> Wrong Username and/or password!
                      </Alert>
                    )}
                  </Box>
                </Box>
                <Box className="main-container-box-right-form">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address or Username"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    className="main-container-box-right-form-input"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant="outlined"
                    className="main-container-box-right-form-input"
                  />
                </Box>
                <Box className="main-container-box-right-form-login">
                  <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: "#F2AF29",
                    }}
                  >
                    Log in
                  </StyledButton>
                </Box>
                <Box className="main-container-box-right-form-buttonbox">
                  <Box>
                    <StyledButton>Forgot Password?</StyledButton>
                  </Box>
                  <Box>
                    <Link to="/SignUp" style={{ textDecoration: "none" }}>
                      <StyledButton
                        sx={{
                          backgroundColor: "#E0E0CE",
                        }}
                      >
                        Don't have an account? Sign up
                      </StyledButton>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state?.auth?.error,
  auth: state?.auth,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (username, password) =>
    dispatch(actions.authLogin(username, password)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));