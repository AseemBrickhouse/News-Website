import React from "react";
import { Typography, Avatar, Box } from "@material-ui/core";
import "./css/TopRated.css";
import { Link } from "react-router-dom";

const TopRatedEntry = ({ article, articleKey, reporter }) => {
  return (
    <Box className="main-toprated-container">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link
          className="main-container-link"
          to={{
            pathname: "/Account/People/" + reporter.key + "/",
            state: {
              key: reporter.key,
              person: reporter,
            },
          }}
        >
          <Box className="main-toprated-container-article-header">
            <Avatar
              alt={`${reporter.first_name} ${reporter.last_name}`}
              src={reporter.profile_pic || "/images/defaultProfilePic.png"}
              className="main-toprated-container-profile-pic"
            />
            <Typography
              style={{
                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
              }}
            >
              <span className="main-toprated-container-article-reporter">
                {`${reporter.first_name} ${reporter.last_name}`}{" "}
              </span>
            </Typography>
          </Box>
        </Link>
        <Link
          className="main-container-link"
          to={{
            pathname: "/Articles/" + article.key + "/",
            state: {
              ArticleID: articleKey,
              Article: article,
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box className="main-toprated-container-article-headline-container">
              <Typography
                style={{
                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                }}
              >
                <span className="main-toprated-container-article-headline-container">
                  {article.headline}
                </span>
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>
      <Box sx={{ width: "100px", height: "100px", marginRight: "5vw" }}>
        {article.article_pic != null ? (
          <Box sx={{ width: "100px", height: "100px" }}>
            <img
              alt={`article_pic`}
              src={`${article?.article_pic}`}
              className="main-toprated-container-article-picture"
            />
          </Box>
        ) : (null) }
      </Box>
    </Box>
  );
};
export default TopRatedEntry;
