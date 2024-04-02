import React, { useState, useEffect } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { styled } from "@material-ui/core/styles";
import { TextField, withStyles, createTheme } from "@material-ui/core";
import useKeyDebounce from "../../Hooks/GeneralHooks/useKeyDebounce";

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

const Account = ({ account, isEditing, updateValue }) => {
  const [accountData, setAccountData] = useState(account);
  const [updateKey, setUpdateKey] = useState(null);

  const [originalAccountData, setOriginalAccountData] = useState(account);

  const { debouncedKey, debouncedValue } = useKeyDebounce(
    accountData[updateKey],
    updateKey,
    500
  );

  const entries = [
    { label: "First name", key: "first_name", autoComplete: "firstName" },
    { label: "Last name", key: "last_name", autoComplete: "lastName" },
    { label: "Email", key: "email", autoComplete: "email" },
    { label: "Occupation", key: "occupation", autoComplete: "occupation" },
    { label: "Phone Number", key: "phone", autoComplete: "phoneNumber" },
  ];

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

  useEffect(() => {
    if (isEditing && debouncedKey !== null) {
      setAccountData((prevState) => ({
        ...prevState,
        [debouncedKey]: debouncedValue,
      }));
      updateValue(debouncedKey, debouncedValue)
    }

  }, [debouncedKey, debouncedValue]);

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setAccountData({ ...accountData, [key]: value });
    setUpdateKey(key);
  };

  return (
    <MuiThemeProvider theme={theme}>
      {entries.map((entry) => (
        <div className="account-right-tab-entry" key={entry.key}>
          <span className="entry-header">{entry.label}: </span>
          {isEditing ? (
            <CssTextField
              name={entry.label}
              required
              id={entry.key}
              variant="outlined"
              label={originalAccountData[entry.key]}
              color="#F2AF29"
              autoComplete={entry.autoComplete}
              onChange={(e) => handleInputChange(e, entry.key)}
            />
          ) : (
            <span>{originalAccountData[entry.key]}</span>
          )}
        </div>
      ))}
    </MuiThemeProvider>
  );
};
export default Account;
