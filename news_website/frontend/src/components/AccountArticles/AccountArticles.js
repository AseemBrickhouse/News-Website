import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import useAccountArticleFetcher from "../../Hooks/AccountHooks/useAccountArticleFetcher";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomTabPanel from "../CustomTab/CustomTab";
import { Box } from "@mui/material";
import ArticleSection from "../Account/AccountLeft/ArticleSection";
import "./css/AccountArticles.css";
const AccountArticles = ({ account }) => {
  const { articles } = useAccountArticleFetcher(account);

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
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        marginTop: "5vh",
        padding: "50px",
      }}
    >
      <Box
        style={{
          width: "60%",
          marginLeft: "20vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>Your Stories</h1>
        <>
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
          >
            <Tab
              sx={{
                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                fontSize: "12px",
                fontWeight: "600",
                padding: "0px",
              }}
              label="Published"
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
              label="Drafts"
              {...a11yProps(1)}
            />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <ArticleSection
              account={account}
              field={"isPrivate"}
              person={account}
              condition={false}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ArticleSection
              account={account}
              field={"isPrivate"}
              person={account}
              condition={true}
            />
          </CustomTabPanel>
        </>
      </Box>
      <Box
        style={{
          width: "40%",
        }}
      >
        {/* <h1>Staff Picks</h1> */}
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {
    account: state?.auth?.account,
  };
};
export default withRouter(connect(mapStateToProps, null)(AccountArticles));
