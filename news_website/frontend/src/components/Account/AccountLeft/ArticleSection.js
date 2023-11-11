import React, { useState, useEffect } from "react";
import ArticleEntry from "../../ArticleEntry/ArticleEntry";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as savedArticleActions from "../../../store/actions/savedArticles";

const ArticleSection = ({ articles }) => {
  console.log(articles);
  return (
    <div>
      {articles != null &&
        Object.entries(articles).map(([key, article]) => {
          return (
            <ArticleEntry
              article={article}
              reporter={article.reporter_account}
              articleKey={key}
            />
          );
        })}
    </div>
  );
};
export default ArticleSection;
