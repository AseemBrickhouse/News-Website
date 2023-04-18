import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import {withRouter, Link } from "react-router-dom";
import "./css/Article.css";
import Util from "../../Utility";
import { Chip, Box, } from "@material-ui/core";
import StickyBox from "react-sticky-box";
import * as articleActions from "../../../store/actions/article";
import * as savedArticleActions from "../../../store/actions/savedArticles";
import StarIcon from "@mui/icons-material/Star";
import SearchBarComponent from "./components/SearchBar/SearchBar";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import TopRated from "./components/TopRated/TopRated";
import { Advertisments } from "./Advertisments";

const Article = (props) => {

  const [load, setLoad] = useState(true);

  const Utility = new Util();

  useEffect(async () => {
    const token = localStorage.getItem("token");
    props.getArticles(token);
    props.getSavedArticles(token);
    setLoad(true);
  }, [load]);

  const handleBookMark = (key) => {
    fetch("api/Bookmark/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoad(false);
      });
  };
  const handleRemoveBookMark = (key) => {
    fetch("api/RemoveBookmark/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: key,
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoad(false);
        // console.log(data)
      });
  };
  const isBookmarked = (key) => {
    return props.saved.saved == null || props.saved.saved[key] === undefined
      ? false
      : true;
  };
  return (
    <React.Fragment>
      <div className="container">
        <Box className="main-article-container">
          {props.allArticles != null ? (
            Object.entries(props.allArticles).map(([id, Article]) => {
              const reporter = Article.reporter_account;
              return (
                <Box className="main-article-container-reporter">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "black",
                      underline: "none",
                    }}
                    to={{
                      pathname: "/Articles/" + Article.key + "/",
                      state: {
                        ArticleID: Article.key,
                        Article: Article,
                      },
                    }}
                  >
                    <Box className="main-article-container-type">
                      {/* Put Work Affilation here*/}
                      {`${reporter.first_name} ${reporter.last_name}   •   ${Utility.getDate(Article.date)} `}
                      {Article.visibility == "FOLLOWER/SUBSCRIBER ONLY" ? (
                          <div className="main-article-container-type-iconset">
                            <StarIcon className="main-article-container-type-icon" style={{fontSize: "10px"}}/>
                            <span>Members only</span>
                          </div>
                      ) : (null)}
                    </Box>
                    <Box className="main-article-container-description">
                      <Box className="main-article-container-description-headline">
                        {Article.headline}
                      </Box>
                      <Box className="main-article-container-description-description">
                        {Article.article_description}
                      </Box>
                    </Box>
                    <Box className="main-article-container-description-tag-container">
                      <Box className="main-article-container-description-tags-outline">
                        {Array.isArray(Article.tags) ? (
                          Article.tags.map((tag) => {
                            return (
                              <Box sx={{ margin: "5px" }}>
                                <Chip
                                  className="main-article-container-description-tags-content"
                                  style={{
                                    fontFamily:
                                      "Neue Haas Grotesk Display Pro, sans-serif",
                                  }}
                                  label={tag}
                                />
                              </Box>
                            );
                          })
                        ) : (
                          <Box sx={{ margin: "5px" }}>
                            <Chip
                              className="main-article-container-description-tags-content"
                              style={{
                                fontFamily:
                                  "Neue Haas Grotesk Display Pro, sans-serif",
                              }}
                              label={Article.tags}
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Link>
                  <Box sx={{ alignContent: "right", marginTop: "auto" }}>
                    {isBookmarked(Article.key) ? (
                      <Box onClick={() => handleRemoveBookMark(Article.key)}>
                        <BookmarkIcon
                          style={{ color: "#F2AF29", fontSize: "35px" }}
                        />
                      </Box>
                    ) : (
                      <Box onClick={() => handleBookMark(Article.key)}>
                        <BookmarkAddIcon
                          style={{ color: "#C1BDBD", fontSize: "35px" }}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </Box>
        <StickyBox offsetTop={50}>
          <Box className="main-article-sticky-container">
            <SearchBarComponent />
            <Box className="main-article-toprated-container">
              <TopRated {...props} />
            </Box>
          </Box>
        </StickyBox>
        {/* <Advertisements/> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    allArticles: state.articles.allArticles,
    popArticles: state.articles.popArticles,
    saved: state.savedArticles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedArticles: (token) =>
      dispatch(savedArticleActions.getSAVEDARTICLES(token)),
    getArticles: (token) => dispatch(articleActions.getARTICLES(token)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Article)
);
