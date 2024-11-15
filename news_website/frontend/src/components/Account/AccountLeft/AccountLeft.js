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
import CustomTabPanel from "../../CustomTab/CustomTab";

//TODO: Move tabs into tab panel. Weird formatting stuff when I tried. Didnt feel like fixing it
const AccountLeft = ({ account, key, person }) => {
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

  return (
    person != null && (
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
              <ArticleSection
                person={person}
                field={"isPrivate"}
                condition={false}
              />
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              <ArticleSection
                person={person}
                field={"isPrivate"}
                condition={true}
              />
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
              <ArticleSection person={person} />
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1}>
              <AboutSection person={person} />
            </CustomTabPanel>
          </>
        )}
      </div>
    )
  );
};
const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps)(AccountLeft));
