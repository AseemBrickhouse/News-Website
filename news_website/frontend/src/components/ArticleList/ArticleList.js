import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./css/Article.css";
import { Box } from "@material-ui/core";
import StickyBox from "react-sticky-box";
import * as savedArticleActions from "../../store/actions/savedArticles";
import TopRated from "./TopRated/TopRated";
import ArticleEntry from "../ArticleEntry/ArticleEntry";
import Advertisements from "../Advertisments/Advertisments";
import UseArticleFetcher from "../hooks/UseArticleFetcher";

const Article = (props) => {
  const { articles, popArticles } = UseArticleFetcher();

  return (
    <React.Fragment>
      <div className="main-container-article-layout">
        <Box className="main-article-container">
          {articles != null &&
            Object.entries(articles).map(([articleKey, article]) => {
              return (
                <ArticleEntry
                  article={article}
                  reporter={article.reporter_account}
                  articleKey={articleKey}
                  saved={props?.saved?.saved}
                />
              );
            })}
        </Box>

        <StickyBox offsetTop={50} className="main-article-sticky-container">
          <Box>
            {/* <SearchBarComponent /> */}
            <Box className="main-article-toprated-container">
              <TopRated popularArticles={popArticles} />
            </Box>
          </Box>
        </StickyBox>
        <Advertisements/>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  saved: state.savedArticles,
});

const mapDispatchToProps = (dispatch) => ({
  getSavedArticles: (token) =>
    dispatch(savedArticleActions.getSAVEDARTICLES(token)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Article)
);
