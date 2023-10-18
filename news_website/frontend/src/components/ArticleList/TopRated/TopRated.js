import React from "react";
import { Box } from "@material-ui/core";
import "./css/TopRated.css";
import TopRatedEntry from "./TopRatedEntry";

const TopRated = ({popularArticles}) => {
  return (
    <Box sx={{ marginBottom: "3px" }}>
      <p className="das">Top rated Articles</p>
      {popularArticles != null
        && Object.entries(popularArticles).map(([id, article]) => {
            return (
              <TopRatedEntry
                article={article}
                articleKey={id}
                reporter={article.reporter_account}
              />
            );
          })
        }
    </Box>
  );
};
export default TopRated;
