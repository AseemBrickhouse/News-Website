import React, { useState, useEffect, useRef } from "react";
import * as request from "../ApiCalls";
import "./css/CommentSection.css";
import Comment from "../Comment/Comment";
import List from "@mui/material/List";
import AddComment from "../Comment/AddComment";

const CommentSection = ({ article }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const Init = async () => {
      const response = await request.GetComments(article.key);
      setComments(response);
    };
    Init();
  }, []);

  return (
    <div id="Comment-Section">
    <AddComment article={article}/>
    <List style={{ padding: "40px 0px"}}>
      {Object.entries(comments).map(([comment_id, comment]) => {
        const person = comment.commenter_account;
        return (
          <div style={{marginTop: "3px", marginBottom: "3px"}}>
            <Comment
              comment_id={comment_id}
              comment={comment}
              person={person}
              article={article}
            />
          </div>
        );
      })}
    </List>
    </div>
  );
};
export default CommentSection;
