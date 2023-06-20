import React from "react";
import { Link } from "react-router-dom";
import { Box} from "@material-ui/core";
import "./css/ReporterArticles.css";

const ReporterArticles = ({ reporterArticles, reporter }) => {
  return (
    <>
      <Box sx={{ marginTop: "5vh" }}>
        <span className="main-container-ra-header">
          {`More from ${reporter.first_name}`}
        </span>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {reporterArticles != null ? (
          Object.entries(reporterArticles).map(([_, Article]) => {
            return (
              <Link className='main-container-ra-link'
                to={{
                  pathname: "/Articles/" + Article.key + "/",
                  state: {
                    ArticleID: Article.key,
                    Article: Article,
                  },
                }}
              >
                <Box className="main-container-ra-articleset">
                  <span
                    className="main-container-ra-headline"
                    style={{
                      width: "60%",
                      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                    }}
                  >
                    {`${Article.headline}`}
                  </span>
                  <Box sx={{ width: "100px", height: "100px" }}>
                    {Article.article_pic != null ? (
                      <img
                        alt={`article_pic`}
                        src={`${Article.article_pic}`}
                        className="main-container-ra-article-image"
                      />
                    ) : (
                      null
                    )}
                  </Box>
                </Box>
              </Link>
            );
          })
        ) : (
          null
        )}
      </Box>
    </>
  );
};
export default ReporterArticles;
