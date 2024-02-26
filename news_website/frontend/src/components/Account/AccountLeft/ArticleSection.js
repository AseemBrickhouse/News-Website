import React from "react";
import ArticleEntry from "../../ArticleEntry/ArticleEntry";
import useAccountArticleFetcher from "../../hooks/useAccountArticleFetcher";
import { Link } from "react-router-dom";
import { Chip, Box } from "@material-ui/core";

const ArticleSection = ({ field, condition, person }) => {
  //TODO: Move one layer up and fix the bug where the first click of a person gets the articles but they still remain after you click "View Profile".
  const { account_articles } = useAccountArticleFetcher(person.key);
  const filterObject = (articles) => {
    const filteredArticles = {};
    articles &&
      Object.entries(articles).filter(([key, value]) => {
        if (value[field] == condition) {
          filteredArticles[key] = value;
        }
      });
    return filteredArticles;
  };
  const filteredArticleObjects = filterObject(account_articles);
  return (
    <div>
      {account_articles &&
        Object.entries(filteredArticleObjects).map(([key, article]) => {
          const showLink = condition;
          return (
            <Box key={key}>
              {showLink ? (
                  <ArticleEntry
                    article={article}
                    reporter={article.reporter_account}
                    articleKey={key}
                    link={"EditArticle"}
                  />
              ) : (
                <ArticleEntry
                  article={article}
                  reporter={article.reporter_account}
                  articleKey={key}
                />
              )}
            </Box>
          );
        })}
    </div>
  );
};
export default ArticleSection;
