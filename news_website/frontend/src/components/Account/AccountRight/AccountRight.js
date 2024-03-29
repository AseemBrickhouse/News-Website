import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Avatar, Button } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { styled } from "@material-ui/core/styles";
import "./css/AccountRight.css";

const AccountRight = ({ account, person }) => {
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
  
    const [following, setFollowing] = useState(person.is_following);
    const [followerCount, setFollowerCount] = useState(0);
    useEffect(() => {
      setFollowing(person.is_following);
      setFollowerCount(person.followers);
    }, [person]);
  
    const handleunFollow = async (person) => {
      // const response = await request.handleUnFollow(person);
      person = response;
      setFollowing(person.is_following);
      setFollowerCount(followerCount - 1);
    };
    const handleFollow = async (person) => {
      // const response = await request.handleFollow(person);
      person = response;
      setFollowing(person.is_following);
      setFollowerCount(followerCount + 1);
    };
  
    return (
      person && (
        <div className="main-container-rt">
          <Link
            className="main-container-rt-link"
            to={{
              pathname: "/Account/People/" + person.key + "/",
              state: {
                key: person.key,
                person: person,
              },
            }}
          >
            <Avatar
              alt={`${person.first_name} ${person.last_name}`}
              src={person.profile_pic || "/images/defaultProfilePic.png"}
              style={{
                height: "60px",
                width: "60px",
              }}
              className="main-container-rt-avatar"
            />
          </Link>
          <Box sx={{ marginTop: "1vh" }}>
            <span className="main-container-rt-name">
              {`${person.first_name} ${person.last_name}`}
            </span>
          </Box>
          <Box sx={{ marginTop: "1vh" }}>
            <span className="main-container-rt-followcount">
              {`${followerCount} Followers`}
            </span>
          </Box>
          <Box sx={{ marginTop: "1vh", marginRight: "50%" }}>
            {account != null &&
              person.key != account.key &&
              (following ? (
                <StyledButton
                  className="btn"
                  onClick={() => {
                    handleunFollow(person);
                  }}
                >
                  <span>Following</span>
                </StyledButton>
              ) : (
                <StyledButton
                  onClick={() => {
                    handleFollow(person);
                  }}
                >
                  Follow
                </StyledButton>
              ))}
          </Box>
        </div>
      )
    );
  };
  const mapStateToProps = (state) => {
    return {
      account: state?.auth?.account,
    };
  };
  export default withRouter(connect(mapStateToProps)(AccountRight));
  