import React, { useEffect, useMemo, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as request from "../Requests";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Chip, Box, Typography, Button, Avatar } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";
import "./css/ReporterTop.css";

const ReporterTop = ({ account, reporter }) => {
  const StyledButton = styled(Button)({
    fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
    border: "1px solid #AD343E",
    backgroundColor: "#AD343E",
    width: "75%",
    height: "70%",
    color: "white",
    fontSize: "15px",
    fontWeight: "600",
    borderRadius: "50px",
    textTransform: "none",
    zIndex: 2,
    transition: "transform ease 0.2s, box-shadow ease 0.2s",
    "&:hover": {
      fontSize: "15px",
      fontWeight: "600",
      color: "white",
      backgroundColor: "#AD343E",
      transform: "translate(0, -3px)",
      boxShadow: "0 20px 80px -10px #AD343E",
    },
  });
  const [following, setFollowing] = useState([]);
  const [followerCount, setFollowerCount] = useState(0);
  useEffect(() => {
    setFollowing(reporter.is_following);
    setFollowerCount(reporter.followers);
  }, [reporter]);

  const handleunFollow = async (person) => {
    const response = await request.handleUnFollow(person);
    reporter = response;
    setFollowing(reporter.is_following);
    setFollowerCount(followerCount - 1);
  };
  const handleFollow = async (person) => {
    const response = await request.handleFollow(person);
    reporter = response;
    setFollowing(reporter.is_following);
    setFollowerCount(followerCount + 1);
  };

  return (
    <>
      <Link
        className="main-container-rt-link"
        to={{
          pathname: "/Account/People/" + reporter.key + "/",
          state: {
            key: reporter.key,
            person: reporter,
          },
        }}
      >
        {reporter.profile_pic != null ? (
          <Avatar
            alt={`${reporter.first_name} ${reporter.last_name}`}
            src={reporter.profile_pic}
            className="main-container-rt-avatar"
          />
        ) : (
          <Avatar
            alt={`${reporter.first_name} ${reporter.last_name}`}
            src="/images/defaultProfilePic.png"
            className="main-container-rt-avatar"
          />
        )}
      </Link>
      <Box sx={{ marginTop: "1vh" }}>
        <span className="main-container-rt-name">
          {`${reporter.first_name} ${reporter.last_name}`}
        </span>
      </Box>
      <Box sx={{ marginTop: "1vh" }}>
        <span className="main-container-rt-followcount">
          {`${followerCount} Followers`}
        </span>
      </Box>
      <Box sx={{ marginTop: "1vh", marginRight: "50%" }}>
        {account != null && reporter.key != account.key ? (
          following ? (
            <StyledButton
              className="btn"
              onClick={() => {
                handleunFollow(reporter);
              }}
            >
              <span>Following</span>
            </StyledButton>
          ) : (
            <StyledButton
              onClick={() => {
                handleFollow(reporter);
              }}
            >
              Follow
            </StyledButton>
          )
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth.token != null ? state.auth.account : null,
  };
};
export default withRouter(connect(mapStateToProps)(ReporterTop));
