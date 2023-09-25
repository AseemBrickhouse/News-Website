import React, { useState } from 'react';
import RightPanel from './components/RightPanel/RightPanel';
import LeftPanel from './components/LeftPanel/LeftPanel';
import StickyBox from "react-sticky-box";

import "./css/ArticleID.css";

const ArticleID = (props) => {
    const[article, setArticle] = useState(props.location.state.Article)
    window.scrollTo(0, 0);
    const fetchArticleUpdate = async() => {

    }
    return(
      article != null && (
        <React.Fragment>
          <div className="main-container-articleID">
            <LeftPanel article = {article}/>
            <StickyBox offsetTop={75}>
              <RightPanel reporter = {article.reporter_account}/>
            </StickyBox>
          </div>
        </React.Fragment>
      )
    )
}

export default ArticleID;