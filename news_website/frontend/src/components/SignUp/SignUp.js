import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/auth";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "@material-ui/core/styles";
import * as request from "../ApiCalls/SignUp";
import {
  Button,
  Box,
  Container,
  TextField,
  withStyles,
  createTheme,
} from "@material-ui/core";
import Loading from "../Loading/Loading";
import AlertTitle from "@mui/material/AlertTitle";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import "./css/Login.css";
import "./css/SignUp.css";
import { Alert } from "@mui/material";

const SignUp = (props) => {
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(false);
  const [formFields, setFormField] = useState({
    first_name: null,
    last_name: null,
    email: null,
    token: null,
  })

  const StyledButton = styled(Button)({
    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    color: "black",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    textTransform: "none",
    textDecoration: "none",
  });

  const CssTextField = withStyles({
    root: {
      "& .MuiInputBast-input": {
        asterisk: "red",
      },
      "& label.Mui-focused": {
        color: "#F2AF29",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#F2AF29",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#F2AF29",
        },
        "&:hover fieldset": {
          borderColor: "#F2AF29",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#F2AF29",
        },
        "& .MuiFormControl-root": {
          width: "40%",
        },
      },
    },
  })(TextField);

  const theme = createTheme({
    overrides: {
      MuiFormLabel: {
        asterisk: {
          color: "#AD343E",
          "&$error": {
            color: "#AD343E",
          },
        },
      },
    },
  });

  useEffect(() => {
    console.log(formFields)
    if (!props.loading && props.error != null) {
      setError(props.error);
    } else if (!props.loading && props.error == null && props.auth.token != null) {
      const createAccount = async () => {
        const response = await request.accountCreation(
          formFields.first_name,
          formFields.last_name,
          formFields.email,
          props.auth.token
        );
        if (!response.ok) {
          setError("Server error try again");
        } else {
          props.history.push("/");
        }
      };
      createAccount();
    }
  }, [props.loading]);

  const Checker = (email, password1, password2, first_name, last_name) => {

    const validatePassword = (password1, confirmPassword) => {
      const password = [];
      const minLength = 7;
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

      if (password1.length <= minLength) {
        password.push("Password need to be at least 8 characters long.")
      }
      if (password1 !== confirmPassword) {
        password.push("Passwords are not the same.")
      }
      //TODO: Fix regex checks for weak/medium/strong passwords
      // if (!regex.test(x)){
      //   console.log("regex failed")
      //   return { error: "Password contains invalid character." };
      // }
      return !password?.length ? null : password;
    };
    const validateEmail = (emailToCheck) => {
      const email = [];
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(emailToCheck == ''){
        email.push('Invalid email')
        return email
      }
      if (!regex.test(emailToCheck)) {
        email.push("Email does not follow an email format.")
        return email;
      }
      return null;
    };

    if (first_name == null || last_name == null) return false;

    const passwordError = validatePassword(password1, password2);
    const emailError = validateEmail(email);

    if (passwordError && emailError) {
      setError({password: passwordError,email: emailError})
      return false;
    } else if (passwordError) {
      setError(`Invalid Password - ${passwordError}`);
      return false;
    } else if (emailError) {
      setError(`Invalid Email - ${emailError}`);
      return false;
    }

    return true;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setError(null);
    const email = data.get("email");
    const username = data.get("username");
    const password1 = data.get("password1");
    const password2 = data.get("password2");
    const first_name = data.get("first_name");
    const last_name = data.get("last_name");

    setFormField({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get('email')
    })

    const isValid = Checker(email, password1, password2, first_name, last_name);

    if (isValid) {
      setLoad(true);
      const getToken = async (username, email, password1, password2) => {
        await props.onAuth(username, email, password1, password2);
        return !props.loading && props.error == null
          ? localStorage.getItem("token")
          : null;
      };

      const token = await getToken(username, email, password1, password2);

      setTimeout(() => {
        setLoad(false);
      }, 3000);
    } else if (!props.loading && props.error) {
      setError(props.error);
    }
  };

  return (
    <div>
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
              <MuiThemeProvider theme={theme}>
                <form
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  className="main-container-box-right-su"
                >
                  <Box className="main-container-box-right-header">
                    <Box>
                      <div className="main-container-box-right-header-text">
                        Create Your Account
                      </div>
                    </Box>
                    {error != null && typeof error == "object"
                      ? Object.entries(error).map(([field, error]) => {
                          return (
                            <Alert
                              key={field}
                              severity="error"
                              variant="outlined"
                              style={{ marginBottom: "10px" }}
                            >
                              <AlertTitle>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                              </AlertTitle>
                              {error.map((errorDescription, index) => {
                                return (
                                  <div key={index}>{errorDescription}</div>
                                );
                              })}
                            </Alert>
                          );
                        })
                      : error != null && (
                          <Alert
                            severity="error"
                            variant="outlined"
                          >
                            {error}
                          </Alert>
                        )}
                  </Box>
                  <Box className="main-container-box-right-form-signup">
                    <Box className="main-container-box-right-form-signup-row">
                      <CssTextField
                        name="username"
                        required
                        id="username"
                        variant="outlined"
                        label="Username"
                        color="#F2AF29"
                        autoComplete="username"
                        className="main-container-right-form-signup-input"
                      />
                      <CssTextField
                        required
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        color="#F2AF29"
                        className="main-container-right-form-signup-input"
                      />
                    </Box>
                    <Box className="main-container-box-right-form-signup-row">
                      <CssTextField
                        required
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        autoComplete="new-password"
                        variant="outlined"
                        color="#F2AF29"
                        className="main-container-right-form-signup-input"
                      />
                      <CssTextField
                        required
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        autoComplete="new-password"
                        variant="outlined"
                        className="main-container-right-form-signup-input"
                      />
                    </Box>
                    <Box className="main-container-box-right-form-signup-row">
                      <CssTextField
                        required
                        name="first_name"
                        label="First Name"
                        type="first_name"
                        id="first_name"
                        autoComplete="first_name"
                        variant="outlined"
                        color="#F2AF29"
                        className="main-container-right-form-signup-input"
                      />
                      <CssTextField
                        required
                        name="last_name"
                        label="Last Name"
                        type="last_name"
                        id="last_name"
                        autoComplete="last_name"
                        variant="outlined"
                        color="#F2AF29"
                        className="main-container-right-form-signup-input"
                      />
                    </Box>
                    <Box className="main-container-box-right-form-login">
                      <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{
                          backgroundColor: "#F2AF29",
                          marginTop: "10px",
                        }}
                      >
                        Sign Up
                      </StyledButton>
                    </Box>
                    <Link to="/Login" style={{ textDecoration: "none" }}>
                      <StyledButton
                        sx={{
                          backgroundColor: "#E0E0CE",
                        }}
                      >
                        Already have an account?
                      </StyledButton>
                    </Link>
                  </Box>
                </form>
              </MuiThemeProvider>
            </Box>
          </Container>
        </Box>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth?.error,
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password1, password2) =>
      dispatch(actions.authSignUp(username, email, password1, password2)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
                    {/* {error != null && Array.isArray(error)
                      ? error.map((errorDescription) => {
                          return (
                            <Alert
                              severity="error"
                              variant="outlined"
                              style={{ marginBottom: "10px" }}
                            >
                              {errorDescription[0]}
                            </Alert>F
                          );
                        })
                      : error != null && (
                          <Alert
                            severity="error"
                            variant="outlined"
                            style={{ marginBottom: "10px" }}
                          >
                            {error}
                          </Alert>
                        )} */}