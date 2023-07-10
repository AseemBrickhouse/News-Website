import React, { useState, useEffect } from "react";
import * as request from "../ApiCalls";
import "./css/CommentSection.css";
import Comment from "../Comment/Comment";
import List from "@mui/material/List";

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
    <List style={{ padding: "40px 00px"}}>
      {Object.entries(comments).map(([comment_id, comment]) => {
        const person = comment.commenter_account;
        return (
          <div style={{marginTop: "3px", marginBottom: "3px"}}>
            <Comment
              comment_id={comment_id}
              comment={comment}
              person={person}
            />
          </div>
        );
      })}
    </List>
  );
};
export default CommentSection;
