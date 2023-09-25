import React, { useState, useEffect } from "react";
import * as request from "../ApiCalls";
import "./css/CommentSection.css";
import Comment from "../Comment/Comment";
import List from "@mui/material/List";
import AddComment from "../Comment/AddComment";

const CommentSection = ({ article }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await request.GetComments(article.key);
      setComments(response);
    };
    fetchData();
  }, [article]);

  const fetchUpdatedComments = async () => {
    const response = await request.GetComments(article.key);
    setComments(response);
  };

  return (
    <div id="Comment-Section" className="comment-section-container">
      <AddComment
        style={{ position: "unset" }}
        article={article}
        onUpdateComments={fetchUpdatedComments}
      />
      <div id="Add-Comment"></div>
      <List style={{ padding: "40px 0px", position: "unset" }}>
        {Object.entries(comments).map(([comment_id, comment]) => {
          const person = comment.commenter_account;
          return (
            <div
              style={{ marginTop: "3px", marginBottom: "3px" }}
              key={comment_id}
            >
              <Comment
                key={comment_id}
                comment_id={comment_id}
                comment={comment}
                person={person}
                article={article}
                onUpdateComments={fetchUpdatedComments}
              />
            </div>
          );
        })}
      </List>
    </div>
  );
};
export default CommentSection;
