import React from 'react';
import RightPanel from './components/RightPanel/RightPanel';
import LeftPanel from './components/LeftPanel/LeftPanel';
import StickyBox from "react-sticky-box";

import "./css/ArticleID.css";

const ArticleID = (props) => {
    const Article = props.location.state.Article
    window.scrollTo(0, 0);
    return(
      Article != null && (
        <React.Fragment>
          <div className="main-container-articleID">
            <LeftPanel article = {Article}/>
            <StickyBox offsetTop={75}>
              <RightPanel reporter = {Article.reporter_account}/>
            </StickyBox>
          </div>
        </React.Fragment>
      )
    )
}

export default ArticleID;