import React from "react";
import { Chip, Box, Avatar } from "@material-ui/core";
import "./css/LeftPanel.css";
import Util from "../../../../../Utility";
import StarIcon from "@mui/icons-material/Star";
import Options from "./components/Options";
//TODO: Add button functionality

const LeftPanel = ({ article }) => {
  const Utility = new Util();

  const ReadTime = () => {
    const text = article.article_body;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return (
        <span className="main-container-reporter-box-date">
          {time} min read
        </span>
    );
  };
  const ReporterBox = () => {
    const reporter = article.reporter_account;

    return (
      <div className="main-container-reporter-box">
        <Avatar
          alt={`${reporter.first_name} ${reporter.last_name}`}
          src= { reporter.profile_pic || "/images/defaultProfilePic.png" }
          sx={{
            height: "60px",
            width: "60px",
          }}
          className="main-container-rt-avatar"
        />
        <div className="main-container-reporter-box-info">
          <span className="main-container-reporter-name">
            {reporter.first_name} {reporter.last_name}
          </span>
          <div className="main-container-reporter-box-times">
            <ReadTime />
            <span className="main-container-reporter-box-date">
              {" "}  • Posted {Utility.getDate(article.date)}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const Tags = () => {
    const articleTags = Array.isArray(article.tags) ? article.tags : [article.tags];

    return (
      article != null && (
        <div className="main-container-button-box-tags">
          {articleTags.map((tag, index) => (
            <Box className="main-container-button-box-tag" key={index}>
              <Chip
                style={{
                  backgroundColor: "#d9cab3",
                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                  fontSize: "15px",
                  fontWeight: "475",
                  textDecoration: "none",
                }}
                label={tag}
              />
            </Box>
          ))}
        </div>
      )
    );
  };

  return (
    article && (
      <Box className="main-container">
        <Box className="main-container-type">
          {article.visibility === "FOLLOWER/SUBSCRIBER ONLY" && (
            <div className="main-container-type-iconset">
              <StarIcon
                className="main-container-type-icon"
                style={{ fontSize: "15px" }}
              />
              <span>Members only</span>
            </div>
          )}
        </Box>
        <Box className="main-container-headline">
          <span className="main-container-headline-text">
            {article.headline}
          </span>
        </Box>
        <Box className="main-container-button-box">
          <ReporterBox />
          <Tags />
          <Options article={article}/>
        </Box>
        <Box className="main-container-description">
          <span className="main-container-description-text">
            {article?.sub_title}
          </span>
        </Box>
        <Box className="main-container-article-body">
          <span className="main-container-article-body-text">
            {article?.article_body}
          </span>
        </Box>
      </Box>
    )
  );
};
export default LeftPanel;
