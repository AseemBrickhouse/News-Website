import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import { Avatar, Button } from "@material-ui/core";
import "./css/AccountLeft.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ArticleSection from "./ArticleSection";
import AboutSection from "./AboutSection";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const AccountLeft = ({ account, key, person, articles }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);
  return (
    <div className="main-container">
      <div className="main-container-account-header">
        <h1>
          {person.first_name} {person.last_name}
        </h1>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: "#AD343E",
            top: '40px',
          },
        }}
        textColor="black"
        indicatorColor="#AD343E"
      >
        <Tab
          sx={{
            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            padding: "0px",
          }}
          label="Articles"
          disableRipple
          {...a11yProps(0)}
        />
        <Tab
          sx={{
            fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            padding: "0px",
          }}
          disableRipple
          label="About"
          {...a11yProps(1)}
        />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <ArticleSection articles={articles}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AboutSection />
      </CustomTabPanel>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps)(AccountLeft));
