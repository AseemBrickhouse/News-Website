import React from "react";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

import PlayButton from "./options/PlayButton"
import BookMarkButton from "./options/BookMarkButton"
import "../css/LeftPanel.css"

const Options = ({ article }) => {
  return (
    <div className="main-container-button-box-options">
      <div className="main-container-button-box-left">
        <ThumbUpOffAltIcon style={{ color: "B2D9C1", fontSize: "24px" }} />
        <ThumbDownOffAltIcon style={{ color: "#AD343E", fontSize: "24px" }} />
        <CommentOutlinedIcon style={{ color: "#474747", fontSize: "24px" }} />
      </div>
      <div className="main-container-button-box-right">
        <BookMarkButton article = {article}/>
        <PlayButton article={article}/>
        <MoreHorizOutlinedIcon style={{ color: "#000000", fontSize: "24px" }} />
      </div>
    </div>
  );
};

export default Options;
