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
import TabPanel from "./TabPanel";

//TODO: Move tabs into tab panel. Weird formatting stuff when I tried. Didnt feel like fixing it
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
  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  function filterObject(obj, field, condition){
    const newObj = {}
    obj !== undefined && Object.entries(obj).filter(([key, value]) => {
        if(value[field] == condition){
          newObj[key] = value
        }
      })
    return newObj;
  }
  return (
    <div className="main-container">
      <div className="main-container-account-header">
        <h1>
          {person.first_name} {person.last_name}
        </h1>
      </div>
      {account?.key === person?.key ? (
        <>
          <Tabs
            value={tab}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#AD343E",
                top: "40px",
              },
            }}
            textColor="black"
            indicatorColor="#AD343E"
          >
            <Tab
              sx={{
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
                fontSize: "12px",
                fontWeight: "600",
                padding: "0px",
              }}
              label="Drafts"
              disableRipple
              {...a11yProps(0)}
            />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <ArticleSection articles={filterObject(articles, "isPrivate", false)} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <ArticleSection articles={filterObject(articles, "isPrivate", true)} />
          </CustomTabPanel>
        </>
      ) : (
        <>
          <Tabs
            value={tab}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#AD343E",
                top: "40px",
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
          <CustomTabPanel value={tab} index={0}>
            <ArticleSection articles={articles} />
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <AboutSection person={person}/>
          </CustomTabPanel>
        </>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps)(AccountLeft));
