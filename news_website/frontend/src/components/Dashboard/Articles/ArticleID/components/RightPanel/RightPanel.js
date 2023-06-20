import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Chip, Box, Typography, Button, Avatar } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";
import ReporterArticles from "./ReporterArticles/ReporterArticles";
import * as request from "./Requests";
import ReporterTop from "./ReporterTop/ReporterTop";

const RightPanel = ( {reporter} ) => {
  const [reporterArticles, setReporterArticles] = React.useState([]);

  useEffect(() => {
    const Init = async() =>{
        setReporterArticles(await request.GetReporterArticles(reporter))
    }
    Init()
  }, []);
  
  return (
    <StickyBox offsetTop={50}>
      <Box className="main-container-rightpannel">
        <Box>
          <Box
            sx={{
              marginTop: "2vh",
              alignContent: "flex-start",
              justifyContent: "center",
              marginLeft: "12.5%",
            }}
          >
            <ReporterTop 
              reporter={reporter} 
            />
            <ReporterArticles 
              reporterArticles={reporterArticles} 
              reporter={reporter} 
            />
          </Box>
        </Box>
      </Box>
    </StickyBox>
  );
};
export default RightPanel;
