import React from "react";
import { Link } from "react-router-dom";
import { Box} from "@material-ui/core";
import "./css/ReporterArticles.css";

const ReporterArticles = ({ reporterArticles, reporter }) => {
  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <span className="main-container-ra-header">
          {`More from ${reporter.first_name}`}
        </span>
      </div>
      <div sx={{ display: "flex", flexDirection: "column" }}>
        {reporterArticles != null && (
          Object.entries(reporterArticles).map(([id, Article]) => {
            return (
              <Link className='main-container-ra-link'
                to={{
                  pathname: "/Articles/" + id + "/",
                  state: {
                    ArticleID: id,
                    Article: Article,
                  },
                }}
              >
                <div className="main-container-ra-articleset">
                  <span
                    className="main-container-ra-headline"
                    style={{
                      width: "60%",
                      fontFamily: "Neue Haas Grotesk Display Pro, sans-serif",
                    }}
                  >
                    {`${Article.headline}`}
                  </span>
                  <div sx={{ width: "100px", height: "100px" }}>
                    {Article.article_pic != null && (
                      <img
                        alt={`article_pic`}
                        src={`${Article.article_pic}`}
                        className="main-container-ra-article-image"
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};
export default ReporterArticles;
