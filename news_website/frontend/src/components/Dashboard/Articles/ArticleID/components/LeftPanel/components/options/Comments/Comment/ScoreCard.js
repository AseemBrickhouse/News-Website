import React, { useState, useEffect } from "react";
import * as request from "../ApiCalls";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./css/ScoreCard.css"

const ScoreCard = ({ comment_rating }) => {
    const [rating, setRating] = useState(comment_rating);
    return (
        <Box className="score">
        <IconButton
          disableRipple
          aria-label="increase score"
          onClick={() => {
            setRating(rating + 1);
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
            setRating(rating - 1);
          }}
        >
          <RemoveIcon className="score-remove" />
        </IconButton>
      </Box>
    )
}
export default ScoreCard;