import React, { useEffect, useState } from "react";
import ArticleEntry from "../../ArticleEntry/ArticleEntry";
import useAccountArticleFetcher from "../../hooks/useAccountArticleFetcher";
import useArticleFilter from "../../hooks/useArticleFilter";
import { Box } from "@material-ui/core";
import "../../CreateArticle/css/CreateArticle.css";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import EditIcon from "@mui/icons-material/Edit";
import { connect } from "react-redux";
import * as articleAPI from "../../../Services/ApiCalls/ArticleApi";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Clicked = Object.freeze({
  SELECTED: "selected",
});

const ArticleSection = ({ field, condition, person, account }) => {
  //TODO: Move one layer up and fix the bug where the first click of a person gets the articles but they still remain after you click "View Profile".
  //Need to fix the time: When published it needs to update the date as well
  //Add "Are you sure prompt when deleting an article"
  const [isLoading, setIsLoading] = useState(true);
  const { account_articles } = useAccountArticleFetcher(person.key);
  useEffect(() => {
    if (account_articles === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [account_articles]);
  const [filteredArticles, setAccountArticles] = useArticleFilter(
    account_articles,
    field,
    condition
  );

  const handleDelete = async (key, article) => {
    setAccountArticles((prev) => {
      const newAccountArticles = { ...prev };
      delete newAccountArticles[key];
      return { ...newAccountArticles };
    });
    const response = await articleAPI.DeleteArticle({ ...article });
  };


  //Had to flipflop the tags because im too lazy to fix it
  //In edit/create its tags: selected or unselected
  //Here its 0-n: tag because of how im printing them (don't need to know if they're selected)
  const handlePublish = async (key, article) => {
    setAccountArticles((prev) => {
      const newAccountArticles = { ...prev };
      delete newAccountArticles[key];
      return { ...newAccountArticles };
    });
    const swapKV = (obj) => {
      return Object.keys(obj).reduce((ret,k)=>{
        ret[obj[k]] = Clicked.SELECTED
        return ret;
      },{})
    }
    article.tags = swapKV(article.tags);
    const response = await articleAPI.UpdateArticle({
      ...article,
      isPrivate: false,
    });
  };
  return (
    <div>
      {isLoading ? (
        <Box>
          {" "}
          <CircularProgress />
        </Box>
      ) : (
        filteredArticles &&
        Object.entries(filteredArticles).map(([key, article]) => {
          const showLink = condition;
          return (
            <Box key={key} display={"flex"} flexDirection={"row"}>
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
              {account.key === person.key && (
                <div className="article-container-right-options">
                  {showLink && (
                    <div>
                      <button
                        className="articles-delete"
                        style={{ backgroundColor: "#B2D9C1" }}
                        onClick={() => handlePublish(key, article)}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                          }}
                        >
                          <PublishIcon sx={{ marginRight: "10px" }} />
                          <span>Publish</span>
                        </div>
                      </button>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                          underline: "none",
                        }}
                        to={{
                          pathname: "/Articles/Edit/" + key + "/",
                          state: {
                            articleID: key,
                            article: article,
                          },
                        }}
                      >
                        <button
                          className="articles-delete"
                          style={{ backgroundColor: "#d9cab3" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            <EditIcon sx={{ marginRight: "10px" }} />
                            <span>Edit</span>
                          </div>
                        </button>
                      </Link>
                    </div>
                  )}
                  <button
                    className="articles-delete"
                    style={{ backgroundColor: "#AD343E" }}
                    onClick={() => handleDelete(key, article)}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}
                    >
                      <DeleteIcon sx={{ marginRight: "10px" }} />
                      <span>Delete</span>
                    </div>
                  </button>
                </div>
              )}
            </Box>
          );
        })
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth.account,
    isAuthenticated: state?.auth?.token,
  };
};
export default connect(mapStateToProps, null)(ArticleSection);
