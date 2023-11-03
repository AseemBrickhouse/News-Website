import React from "react";
import { connect } from "react-redux";
import MyAccount from "../../Dashboard/MyAccount";
import { Link, withRouter } from "react-router-dom";

import { Box } from "@material-ui/core";
import StickyBox from "react-sticky-box";

import * as actions from "../../../store/actions/auth";
import "./css/Header.css";
import SubHeader from "../Subheader/SubHeader";

const Header = (props) => {
  const pathLocation =
    props.location.pathname != "/Login" &&
    props.location.pathname != "/SignUp" &&
    !props.location.pathname.includes("Error");

  return pathLocation && (
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
                  <div className="main-container-header-getstarted">
                    <Link className="main-container-header-link" to="/SignUp">
                      Get Started
                    </Link>
                  </div>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </StickyBox>
      <SubHeader {...props} />
    </>
  )
};

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(actions.authLOGOUT()),
});
export default withRouter(connect(null, mapDispatchToProps)(Header));
