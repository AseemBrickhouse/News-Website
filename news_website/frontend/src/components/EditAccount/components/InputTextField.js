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

const InputTextField = ({label, key,}) => {
  return (
    <CssTextField
      name={entry.label}
      required
      id={entry.key}
      variant="outlined"
      label={update[entry.key]}
      color="#F2AF29"
      autoComplete={entry.autoComplete}
      onChange={e => handleInputChange(e, entry.key)}
    />
  )
}

export default InputTextField;