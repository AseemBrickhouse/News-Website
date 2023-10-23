import React from "react";

import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import Rating from "./Options/Rating/Rating"
import PlayButton from "../../../Buttons/ArticleButtons/TextToSpeech/PlayButton"
import BookMarkButton from "../../../Buttons/ArticleButtons/BookMark/BookMarkButton"
import CommentButton from "../../../Buttons/ArticleButtons/Comment/CommentButton";

import "../css/LeftPanel.css"

const Options = ({ article }) => {
  return (
    <div className="main-container-button-box-options">
      <div className="main-container-button-box-left">
        <Rating article={article}/>
        <CommentButton article={article}/>
      </div>
      <div className="main-container-button-box-right">
        <BookMarkButton article={article}/>
        <PlayButton article={article}/>
        <MoreHorizOutlinedIcon style={{ color: "#000000", fontSize: "24px" }} />
      </div>
    </div>
  );
};

export default Options;
