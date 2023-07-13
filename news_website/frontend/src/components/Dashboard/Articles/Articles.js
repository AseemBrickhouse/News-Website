import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css/Article.css";
import { Box } from "@material-ui/core";
import StickyBox from "react-sticky-box";
import * as articleActions from "../../../store/actions/article";
import * as savedArticleActions from "../../../store/actions/savedArticles";
import SearchBarComponent from "./components/SearchBar/SearchBar";
import TopRated from "./components/TopRated/TopRated";
import { Advertisments } from "./Advertisments";
import * as request from "./ApiCalls/Requests";
import ArticleEntry from "./ArticleEntry";

const Article = (props) => {
  const [load, setLoad] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!load) {
      const init = async () => {
        const token = localStorage.getItem("token");
        props.getSavedArticles(token);
        setArticles(await request.AllArticles([]));
      };
      init();
      setLoad(true);
    }
  }, [load]);

  return (
    <React.Fragment>
      {/* TODO: This is the cause of the format thingy fix */}
      <div className="main-container-article-layout">
        <Box className="main-article-container">
          {articles.articles != null &&
            Object.entries(articles.articles).map(([articleKey, article]) => {
              return (
                <ArticleEntry
                  article={article}
                  reporter={article.reporter_account}
                  articleKey={articleKey}
                  saved={props.saved.saved}
                />
              );
            })}
        </Box>

        <StickyBox offsetTop={50} className="main-article-sticky-container">
          <Box>
            <SearchBarComponent />
            <Box className="main-article-toprated-container">
              <TopRated 
                popularArticles={props.popArticles}
              />
            </Box>
          </Box>
        </StickyBox>
        {/* <Advertisements/> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  allArticles: state.articles.articles,
  popArticles: state.articles.popArticles,
  saved: state.savedArticles,
});

const mapDispatchToProps = (dispatch) => ({
  getSavedArticles: (token) =>
    dispatch(savedArticleActions.getSAVEDARTICLES(token)),
  getArticles: (token) => dispatch(articleActions.getARTICLES(token)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Article)
);
