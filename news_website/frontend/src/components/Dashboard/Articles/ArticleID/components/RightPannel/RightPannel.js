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

const RightPannel = (props) => {
  const Article = props.location.state.Article;
  const [reporter, setReporter] = useState([]);
  const account = props.account;
  const [reporterArticles, setReporterArticles] = React.useState([]);
//   console.log(Article)

  useEffect(() => {
    const Init = async() =>{
        setReporter(await request.GetPerson(Article.reporter_account))
        setReporterArticles(await request.GetReporterArticles(Article.reporter_account))
    }
    Init()
  }, []);
//   console.log(reporter)
  const StyledButtonSubscribe = styled(Button)({
    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    backgroundColor: "#AD343E",
    width: "75%",
    height: "70%",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "300",
    borderRadius: "50px",
    textTransform: "none",
    textDecoration: "none",
    "&:hover": {
      fontSize: "15px",
      fontWeight: "300",
      color: "white",
      backgroundColor: "black",
    },
  });

  return (
    <StickyBox offsetTop={50}>
      <Box className="main-container-rightpannel">
        <Box>
          {/* <Box sx={{marginLeft: "12.5%", marginTop: "1vh"}}>
              <StyledButtonSubscribe>
                Subscribe Today
              </StyledButtonSubscribe>
            </Box>
            <Box sx={{marginLeft: "12.5%", marginTop: "1vh"}}>
            <SearchBar
              style={{
                borderStyle: "inset",
                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                width: "75%",
                height: "70%",
                borderRadius: "25px",
              }}
              />
            </Box> */}
          <Box
            sx={{
              marginTop: "2vh",
              alignContent: "flex-start",
              justifyContent: "center",
              marginLeft: "12.5%",
            }}
          >
            <ReporterTop reporter={reporter} />
            <ReporterArticles reporterArticles={reporterArticles} reporter={reporter} />
          </Box>
        </Box>
      </Box>
    </StickyBox>
  );
};
export default RightPannel;
