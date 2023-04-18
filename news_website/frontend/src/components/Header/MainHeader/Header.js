import React from "react";
import { connect } from "react-redux";
import MyAccount from "../../Dashboard/MyAccount"
import { Link, withRouter } from "react-router-dom";

import { Box, Button } from "@material-ui/core";

import { styled } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";

import * as actions from "../../../store/actions/auth";
import "./css/Header.css";
import SubHeader from "../Subheader/SubHeader";

const Header = (props) => {
  const StyledButton = styled(Button)({
    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    backgroundColor: "#AD343E",
    width: "110%",
    height: "100%",
    color: "white",
    textDecoration: "none",
    fontSize: "17px",
    fontWeight: "300",
    borderRadius: "50px",
    textTransform: "none",
    textDecoration: "none",
    "&:hover": {
      fontSize: "17px",
      fontWeight: "300",
      color: "white",
      backgroundColor: "black",
    },
  });

  const pathLocation =
    props.location.pathname != "/Login" &&
    props.location.pathname != "/SignUp" &&
    !props.location.pathname.includes("Error");

  return pathLocation ? (
    <>
      <StickyBox offsetTop={0}>
        <Box className="main-container-header">
          <Box className="main-container-header-iconset">
            <Box sx={{ marginLeft: "-5vw" }}>
              <img alt="No Image"></img>
            </Box>
            <Box sx={{ padding: "12px", position: "absolute" }}>
              <Link
                className="main-container-header-link-base"
                style={{
                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                  fontWeight: "700",
                  fontSize: "20px",
                }}
                to="/"
              >
                News Wire
              </Link>
            </Box>
          </Box>
          {props.isAuthenticated ? (
            <Box className="main-container-header-account">
              <MyAccount {...props} />
            </Box>
          ) : (
            <Box className="main-container-header-buttonset">
              <Box sx={{ marginRight: "20px" }}>
                <Link
                  className="main-container-header-link-base"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  to=""
                >
                  Our Mission
                </Link>
                {/* <a href="#About us"> About Us </a> */}
              </Box>
              <Box sx={{ marginRight: "20px" }}>
                <Link
                  className="main-container-header-link-base"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                  to="/Login"
                  {...props}
                >
                  Sign In
                </Link>
              </Box>
              <Box sx={{ marginRight: "20px" }}>
                <Link
                  className="main-container-header-link-base"
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                  to="/SignUp"
                >
                  <StyledButton>Get Started</StyledButton>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </StickyBox>
      <SubHeader {...props} />
    </>
  ) : null;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.authLOGOUT()),
  };
};
export default withRouter(connect(null, mapDispatchToProps)(Header));
