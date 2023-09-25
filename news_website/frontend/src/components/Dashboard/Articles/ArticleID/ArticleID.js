import React, { useState } from "react";
import RightPanel from "./components/RightPanel/RightPanel";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import StickyBox from "react-sticky-box";
import * as request from "../ApiCalls/Requests";
import "./css/ArticleID.css";

const ArticleID = (props) => {
  const article = props.location.state.article
  window.scrollTo(0, 0);
  return (
    article != null && (
      <div>
        <div className="main-container-articleID">
          <LeftPanel article={article} />
          <StickyBox offsetTop={75}>
            <RightPanel
              reporter={article.reporter_account}
            />
          </StickyBox>
        </div>
      </div>
    )
  );
};

export default ArticleID;
