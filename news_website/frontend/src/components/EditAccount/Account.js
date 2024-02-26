import React, { useState, useEffect } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { styled } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Container,
  TextField,
  withStyles,
  createTheme,
} from "@material-ui/core";

const Account = ({ account, edit, updateValue }) => {
    
    console.log(edit)
  const [update, setUpdate] = useState(account);
  useEffect(() => {
    setUpdate(account);
  }, [account]);
  const theme = createTheme({
    overrides: {
      MuiFormLabel: {
        // asterisk: {
        //   color: "#AD343E",
        //   "&$error": {
        //     color: "#AD343E",
        //   },
        // },
      },
    },
  });
  const CssTextField = withStyles({
    root: {
      //   "& .MuiInputBast-input": {
      //     asterisk: "red",
      //   },
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
          width: "100%",
        },
      },
    },
  })(TextField);

  //TODO: convert this to loop through each value and print it out
  const generateEntries = () => {
    Object.entries(account).map(([k, v]) => {
      return (
        <div key={k} className="account-right-tab-entry">
          <span className="entry-header">First name: </span>
          <CssTextField
            name="First Name"
            required
            id="firstName"
            variant="outlined"
            label={update.first_name}
            color="#F2AF29"
            autoComplete="firstName"
          />
        </div>
      );
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className="account-right-tab-entry">
        <span className="entry-header">First name: </span>
        {edit ? (
          <CssTextField
            name="First Name"
            required
            id="firstName"
            variant="outlined"
            label={update.first_name}
            color="#F2AF29"
            autoComplete="firstName"
          />
        ) : (
          <span>{update.first_name}</span>
        )}
      </div>
      <div className="account-right-tab-entry">
        <span className="entry-header">Last name: </span>
        {edit ? (
          <CssTextField
            name="Last Name"
            required
            id="lastName"
            variant="outlined"
            label={update.last_name}
            color="#F2AF29"
            autoComplete="lastName"
          />
        ) : (
          <span>{update.last_name}</span>
        )}
      </div>
      <div className="account-right-tab-entry">
        <span className="entry-header">Email: </span>
        {edit ? (
          <CssTextField
            name="Email"
            required
            id="Email"
            variant="outlined"
            label={update.email}
            color="#F2AF29"
            autoComplete="email"
          />
        ) : (
          <span>{update.first_name}</span>
        )}
      </div>
      <div className="account-right-tab-entry">
        <span className="entry-header">Occupation: </span>
        {edit ? (
          <CssTextField
            name="Occupation"
            required
            id="Occupation"
            variant="outlined"
            label={update.occupation}
            color="#F2AF29"
            autoComplete="occupation"
          />
        ) : (
          <span>{update.occupation}</span>
        )}
      </div>
      <div className="account-right-tab-entry">
        <span className="entry-header">Phone Number: </span>
        {edit ? (
          <CssTextField
            name="Phone Number"
            required
            id="phoneNumber"
            variant="outlined"
            label={update.phone}
            color="#F2AF29"
            autoComplete="phoneNumber"
          />
        ) : (
          <span>{update.phone}</span>
        )}
      </div>
    </MuiThemeProvider>
  );
};
export default Account;
