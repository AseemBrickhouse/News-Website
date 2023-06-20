import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Chip, Box, Typography, Button, Avatar } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { styled } from "@material-ui/core/styles";
import StickyBox from "react-sticky-box";
import "./css/LeftPanel.css";
import Util from "../../../../../Utility";
import StarIcon from "@mui/icons-material/Star";

const LeftPanel = ({ article }) => {
  console.log(article);
  const reporter = article.reporter_account;
  const Utility = new Util();

  return (
    article && (
      <Box className="main-container">
        <Box className="main-container-type">
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
        <Box className="main-container-headline">{article.headline}</Box>
        <Box className="main-container-button-box"></Box>
        <Box className="main-container-description"></Box>
        <Box className="main-container-article-body"></Box>
      </Box>
    )
  );
};
export default LeftPanel;
{
  /* 
    <Box sx={{ display: "flex", flexDirection: "column", width: "60%" }}>
        <article>
          <header>
            <box>
              <Link to="/" style={{ textDecoration: "none", width: "10%" }}>
                <p>
                  <ArrowBackIcon style={{ textDecoration: "none" }} />
                  All posts
                </p>
              </Link>
            </box>
            <div className="headline">{article.headline}</div>
            <sub>{article.sub_title}</sub>
            <div class="article-tags">
              <Box
                sx={{
                  width: "100%",
                  minHeight: "30%",
                  height: "30%",
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                {Array.isArray(article.tags) ? (
                  article.tags.map((tag) => {
                    return (
                      <Box sx={{ margin: "5px" }}>
                        <Chip
                          style={{
                            backgroundColor: "#E0E0CE",
                            fontFamily:
                              "Neue Haas Grotesk Display Pro, sans-serif",
                            fontSize: "15px",
                            textDecoration: "none",
                          }}
                          label={tag}
                        />
                      </Box>
                    );
                  })
                ) : (
                  <Box sx={{ margin: "5px" }}>
                    <Chip
                      style={{
                        backgroundColor: "#E0E0CE",
                        fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                        fontSize: "15px",
                        textDecoration: "none",
                      }}
                      label={article.tags}
                    />
                  </Box>
                )}
              </Box>
            </div>
          </header>
          <authHeader>
            <author>{`${reporter.first_name} ${reporter.last_name}`}</author>
            <dateline>{Utility.getDate(article.date)}</dateline>
          </authHeader>
          <main>
            <div className="description">{article.article_description}</div>
            <body>{article.article_body}</body>
          </main>
        </article>
      </Box>
  */
}
