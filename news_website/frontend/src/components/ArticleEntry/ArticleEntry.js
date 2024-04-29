import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Article.css";
import Util from "../Utility";
import { Chip, Box } from "@material-ui/core";
import StarIcon from "@mui/icons-material/Star";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
// import * as request from "../ApiCalls/Article";
import * as bookmarkAPI from "../../Services/ApiCalls/BookmarkApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Options } from "./Options";
import { Typography } from "@material-ui/core";
const DEFAULT_PATH = "Article";

const ArticleEntry = ({
  article,
  reporter,
  articleKey,
  link = DEFAULT_PATH,
}) => {
  const Utility = new Util();
  const [isBookmarked, setBookmarked] = useState(article.isBookmarked);
  const handleBookMark = (key, type) => {
    bookmarkAPI.handleBookMark(key, type);
    setBookmarked(!isBookmarked);
  };

  return (
    <Box className="main-article-container-body">
      <div className="top">
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            underline: "none",
          }}
          to={{
            // pathname: "/Articles/" + articleKey + "/",
            pathname:
              link === DEFAULT_PATH
                ? "/Articles/" + articleKey + "/"
                : "/Articles/Edit/" + articleKey + "/",
            state: {
              articleID: articleKey,
              article: article,
            },
          }}
        >
          <Box className="main-article-container-type">
            {/* Put Work Affilation here*/}
            <div className="main-article-reporter">
              {`${reporter.first_name} ${
                reporter.last_name
              }   •   ${Utility.getDate(article.date)} `}
            </div>
            {article.visibility == "FOLLOWER/SUBSCRIBER ONLY" && (
              <div className="main-article-container-type-iconset">
                <StarIcon
                  className="main-article-container-type-icon"
                  style={{ fontSize: "10px" }}
                />
                <span>Members only</span>
              </div>
            )}
          </Box>
          <Box className="main-article-container-description">
            <Box className="main-article-container-description-headline">
              {article.headline}
            </Box>
            {/* <Box className="main-article-container-description-description">
              {article.article_description}
            </Box> */}
            <Typography
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                wordBreak: "break-all",
                fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
              }}
            >
              {article.article_description}
            </Typography>
          </Box>
        </Link>
        <Box className="main-article-container-description-tag-container">
          <Box className="main-article-container-description-tags-outline">
            {Array.isArray(article.tags) ? (
              article.tags.map((tag) => {
                return (
                  <Chip
                    className="main-article-container-description-tags-content"
                    style={{
                      backgroundColor: "#d9cab3",
                      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                      fontSize: "15px",
                      fontWeight: "475",
                      textDecoration: "none",
                    }}
                    label={tag}
                  />
                );
              })
            ) : (
              <Chip
                className="main-article-container-description-tags-content"
                style={{
                  backgroundColor: "#d9cab3",
                  fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                  fontSize: "15px",
                  fontWeight: "475",
                  textDecoration: "none",
                }}
                label={article.tags}
              />
            )}
          </Box>
          <Box
            sx={{
              alignContent: "right",
              marginTop: "auto",
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isBookmarked ? (
              <Box
                onClick={() => handleBookMark(article.key, "REMOVE_BOOKMARK")}
              >
                <BookmarkIcon
                  style={{
                    color: "#F2AF29",
                    fontSize: "35px",
                    zIndex: "1",
                  }}
                />
              </Box>
            ) : (
              <Box
                onClick={() => handleBookMark(article.key, "BOOKMARK_ARTICLE")}
              >
                <BookmarkAddIcon
                  style={{ color: "#C1BDBD", fontSize: "35px" }}
                />
              </Box>
            )}
            <Options />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default ArticleEntry;
