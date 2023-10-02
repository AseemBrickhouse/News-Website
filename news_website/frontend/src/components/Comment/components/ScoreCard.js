import React, { useState, useEffect } from "react";
import * as request from "../../Dashboard/Articles/ArticleID/components/LeftPanel/components/options/Comments/ApiCalls";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./css/ScoreCard.css";

const ScoreCard = ({
  comment_id,
  article_key,
  comment_rating,
  comment_vote,
}) => {
  const[voteType, setVoteType] = useState(comment_vote.vote_type)
  const [rating, setRating] = useState(comment_rating);
  const updateRating = async (type) => {
      await request.UpdateRating(comment_id, article_key, rating, type);
    // type == "upvote" ? setRating(rating + 1) : setRating(rating - 1);

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





