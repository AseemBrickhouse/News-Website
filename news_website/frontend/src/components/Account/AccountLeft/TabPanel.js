import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Typography } from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ArticleSection from "./ArticleSection";
import AboutSection from "./AboutSection";
import "./css/AccountLeft.css";
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

const TabPanel = ({ account, articles, person }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("here");
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      {account?.key === person?.key ? (
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#AD343E",
              top: "40px",
            },
          }}
          textColor="black"
          indicatorColor="#AD343E"
        ></Tabs>
      ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#AD343E",
                top: "40px",
              },
            }}
            style={{
                display: "flex",
                flexDirection: "column"
            }}
            textColor="black"
            indicatorColor="#AD343E"
            className="main-container"
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
            <CustomTabPanel value={value} index={0}>
              <ArticleSection articles={articles} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AboutSection />
            </CustomTabPanel>
          </Tabs>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps)(TabPanel));
