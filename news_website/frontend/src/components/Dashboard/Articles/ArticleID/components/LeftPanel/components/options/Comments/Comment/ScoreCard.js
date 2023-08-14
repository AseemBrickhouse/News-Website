import React, { useState, useEffect } from "react";
import * as request from "../ApiCalls";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./css/ScoreCard.css";

const ScoreCard = ({ comment_id, article_key, comment_rating }) => {
  const [rating, setRating] = useState(comment_rating);
  const updateRating = async (type) => {
    await request.UpdateRating(comment_id, article_key, rating, type);
    type == "upvote" ? setRating(rating + 1) : setRating(rating - 1);
  };
  return (
    <Box className="score">
      <IconButton
        disableRipple
        aria-label="increase score"
        onClick={() => {
          updateRating("upvote");
        }}
      >
        <AddIcon className="score-add" />
      </IconButton>
      <Typography sx={{ color: "hsl(0, 0%, 0%)", fontWeight: 500 }}>
        {rating}
      </Typography>
      <IconButton
        disableRipple
        aria-label="decrease score"
        onClick={() => {
          updateRating("downvote");
        }}
      >
        <RemoveIcon className="score-remove" />
      </IconButton>
    </Box>
  );
};
export default ScoreCard;
