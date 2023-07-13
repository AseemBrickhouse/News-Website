import React, { useState, useEffect } from "react";
import * as request from "../ApiCalls";
import "./css/CommentSection.css";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Divider } from "@mui/material";
import Comment from "../Comment/Comment";
import ListItem from "@mui/material/ListItem";

const ChildComments = ({ comment_id, children, clicked,article, parentName }) => {
  return (
    <div style={{width:"100%"}}>
      {clicked && (
        <div key={comment_id} style={{ marginLeft: "20px" }}>
          {Object.entries(children).map(([childComment_id, childComment]) => {
            const person = childComment.commenter_account;
            return (
              <div style={{ marginTop: "3px", marginBottom: "3px" }}>
                <Comment
                  comment_id={childComment_id}
                  comment={childComment}
                  person={person}
                  article={article}
                  parentName={parentName}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default ChildComments;
