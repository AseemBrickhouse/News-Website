import React from "react";
import { Chip, Box, Avatar } from "@material-ui/core";
import "./css/LeftPanel.css";
import Util from "../../../../../Utility";
import StarIcon from "@mui/icons-material/Star";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";

//TODO: Add button functionality

const LeftPanel = ({ article }) => {
  const ReadTime = () => {
    const text = article.article_body;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return (
      <div>
        <span className="main-container-reporter-box-date">
          {time} min read
        </span>
      </div>
    );
  };
  const ReporterBox = () => {
    const reporter = article.reporter_account;
    const Utility = new Util();

    return (
      <div className="main-container-reporter-box">
        {reporter.profile_pic != null ? (
          <Avatar
            alt={`${reporter.first_name} ${reporter.last_name}`}
            src={reporter.profile_pic}
            sx={{
              height: "60px",
              width: "60px",
            }}
            className="main-container-rt-avatar"
          />
        ) : (
          <Avatar
            alt={`${reporter.first_name} ${reporter.last_name}`}
            src="/images/defaultProfilePic.png"
            sx={{
              height: "60px",
              width: "60px",
            }}
            className="main-container-rt-avatar"
          />
        )}
        <div className="main-container-reporter-box-info">
          <span className="main-container-reporter-name">
            {reporter.first_name} {reporter.last_name}
          </span>
          <div className="main-container-reporter-box-times">
            <ReadTime />
            <span className="main-container-reporter-box-date">
              {" "}
              • Posted {Utility.getDate(article.date)}
            </span>
          </div>
        </div>
      </div>
    );
  };
  const Tags = () => {
    return (
      article != null && (
        <div className="main-container-button-box-tags">
          {Array.isArray(article.tags) ? (
            article.tags.map((tag) => {
              return (
                <Box className="main-container-button-box-tag">
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
              );
            })
          ) : (
            <Box className="main-container-button-box-tag">
              <Chip
                style={{
                  backgroundColor: "#d9cab3",
                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                  fontSize: "15px",
                  fontWeight: "475",
                  textDecoration: "none",
                }}
                label={article.tags}
              />
            </Box>
          )}
        </div>
      )
    );
  };

  const Options = () => {
    return (
      <div className="main-container-button-box-options">
        <div className="main-container-button-box-left">
          <ThumbUpOffAltIcon style={{ color: "B2D9C1", fontSize: "24px" }} />
          <ThumbDownOffAltIcon style={{ color: "#AD343E", fontSize: "24px" }} />
          <CommentOutlinedIcon style={{ color: "#474747", fontSize: "24px" }} />
        </div>
        <div className="main-container-button-box-right">
          <BookmarkIcon style={{ color: "#F2AF29", fontSize: "24px" }} />
          <PlayCircleOutlineOutlinedIcon
            style={{ color: "#474747", fontSize: "24px" }}
          />
          <MoreHorizOutlinedIcon
            style={{ color: "#000000", fontSize: "24px" }}
          />
        </div>
      </div>
    );
  };

  return (
    article && (
      <Box className="main-container">
        <Box className="main-container-type">
          {article.visibility == "FOLLOWER/SUBSCRIBER ONLY" && (
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
          <Options />
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
