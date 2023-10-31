import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as commentAPI from '../../ApiCalls/Comment'
import "./css/ScoreCard.css";

const ScoreCard = ({comment_id, article_key, comment_rating, comment_vote}) => {
  const [comment, setComment] = useState(comment_vote)
  const [voteType, setVoteType] = useState(comment.vote_type)
  const [rating, setRating] = useState(comment_rating);

  const [commentVoteId, setCommentVoteId] = useState(comment_vote.id); // Store the comment_vote.id

  useEffect(() => {
    setVoteType(comment.vote_type);
    setCommentVoteId(comment_vote.id); // Store the comment_vote.id when comment changes
  }, [comment]);

  const helper = async (type) => {
    if (commentVoteId === undefined) {
      const response = await commentAPI.AddCommentRating(comment_id, article_key, rating, type);
      console.log(response.id);
      setCommentVoteId(response.id)
    } else if (voteType === type) {
      if (type === 'upvote' || type === 'downvote') {
        await commentAPI.DeleteCommentRating(comment_id, article_key, rating, type, commentVoteId); // Use stored commentVoteId
        setCommentVoteId(undefined)
      }
    } else {
      await commentAPI.UpdateCommentRating(comment_id, article_key, rating, type, commentVoteId); // Use stored commentVoteId
      setVoteType(type);
    }
  }

  const updateRating = async (type) => {
    helper(type);

    if(voteType == undefined){
      if(type == 'upvote'){
        setRating(rating + 1)
      }else if(type == 'downvote'){
        setRating(rating - 1)
      }
      setVoteType(type)
    }else{
      //remove the vote 
      console.log(voteType == type && type == "upvote")
      if (voteType == type && type == "upvote"){
        setRating(rating - 1)
        setVoteType(undefined)
      }
      //upvote
      else if(voteType != type && type == "upvote"){
        setRating(rating + 2)
        setVoteType("upvote")
      }
      //remove the vote
      else if(voteType == type && type == "downvote"){
        setRating(rating + 1)
        setVoteType(undefined)
      //downvote
      }else if(voteType != type && type == "downvote"){
        setRating(rating -2)
        setVoteType("downvote")
      }
    }
  };

  return (
    <Box className="score">
      <IconButton
        disableRipple
        aria-label="change score"
        onClick={() => updateRating("upvote")}
      >
        <AddIcon
          className="score-add"
          style={{ color: voteType === "upvote" ? "green" : undefined }}
        />
      </IconButton>
      <Typography sx={{ color: "hsl(0, 0%, 0%)", fontWeight: 500 }}>
        {rating}
      </Typography>
      <IconButton
        disableRipple
        aria-label="change score"
        onClick={() => updateRating("downvote")}
      >
        <RemoveIcon
          className="score-remove"
          style={{ color: voteType === "downvote" ? "red" : undefined }}
        />
      </IconButton>
    </Box>
  );
};

export default ScoreCard;
