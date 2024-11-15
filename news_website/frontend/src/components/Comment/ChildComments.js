import React from "react";
import "./css/CommentSection.css";
import Comment from "./Comment";

const ChildComments = ({
  comment_id,
  children,
  clicked,
  article,
  parentName,
  onUpdateComments,
}) => {
  return (
    <div style={{ width: "100%" }}>
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
                  onUpdateComments={onUpdateComments}
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
