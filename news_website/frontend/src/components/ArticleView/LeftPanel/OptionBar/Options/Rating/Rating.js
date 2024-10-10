import React from "react";
import "./css/Rating.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import useGetArticleRatingFetcher from "../../../../../../Hooks/ArticleRatingHooks/useGetArticleRatingFetcher";
import { Stack } from "@mui/material";
import * as articleRatingApi from "../../../../../../Services/ApiCalls/ArticleRatingApi";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const Rating = ({ article }) => {
  const [ratingInformation, setRatingInformation] = useGetArticleRatingFetcher(
    article.key
  );
  const updateVote = async (type) => {
    if (ratingInformation["current_article_rating_vote"] == undefined) {
      articleRatingApi.CreateArticleRating(article.key, type);
    } else if (type != ratingInformation["current_article_rating_vote"]) {
      articleRatingApi.UpdateArticleRating(article.key, type);
    } else {
      articleRatingApi.DeleteArticleRating(article.key, type);
    }
  };

  const updateVoteCount = (voteType, value) => {
    setRatingInformation((prevState) => ({
      ...prevState,
      [voteType]: prevState[voteType] + value,
    }));
  };

  const updateCurrentVoteType = (voteType) => {
    setRatingInformation((prevState) => ({
      ...prevState,
      current_article_rating_vote: voteType,
    }));
  };
  const updateRating = (type) => {
    const currentVote = ratingInformation["current_article_rating_vote"];
    //Call Api
    updateVote(type);
    if (currentVote == undefined) {
      // No vote exists, so increment the selected type and set the current vote type
      if (type == "upvote") {
        updateVoteCount("upvote_count", 1);
      } else if (type === "downvote") {
        updateVoteCount("downvote_count", 1);
      }
      updateCurrentVoteType(type);
    } else if (currentVote == type) {
      // If the user clicks the same vote, remove it (undo the vote)
      if (type === "upvote") {
        updateVoteCount("upvote_count", -1);
      } else if (type === "downvote") {
        updateVoteCount("downvote_count", -1);
      }
      updateCurrentVoteType(undefined); // Reset the current vote type
    } else {
      // The user is switching their vote from upvote to downvote or vice versa
      if (type == "upvote") {
        updateVoteCount("upvote_count", 1);
        updateVoteCount("downvote_count", -1);
      } else if (type == "downvote") {
        updateVoteCount("downvote_count", 1);
        updateVoteCount("upvote_count", -1);
      }
      updateCurrentVoteType(type); // Set the new vote type
    }
  };

  return (
    <div className="main-container-rating">
      <Stack direction="row" spacing={1}>
        {ratingInformation["current_article_rating_vote"] == "upvote" ? (
          <ThumbUpAltIcon
            style={{ color: "#B2D9C1" }}
            onClick={() => updateRating("upvote")}
          />
        ) : (
          <ThumbUpOffAltIcon
            style={{ color: "#B2D9C1" }}
            onClick={() => updateRating("upvote")}
          />
        )}
        <span>{ratingInformation["upvote_count"]}</span>
      </Stack>
      <Stack direction="row" spacing={1}>
        {ratingInformation["current_article_rating_vote"] == "downvote" ? (
          <ThumbDownAltIcon
            style={{ color: "#AD343E" }}
            onClick={() => updateRating("downvote")}
          />
        ) : (
          <ThumbDownOffAltIcon
            style={{ color: "#AD343E" }}
            onClick={() => updateRating("downvote")}
          />
        )}
        <span>{ratingInformation["downvote_count"]}</span>
      </Stack>
    </div>
  );
};
export default Rating;

/*
  if ratingInformation.current_article_rating_vote == null/undefined
    then somehow display their current vote
  otherwise
    do nothing

  if rating is clicked then remove the rating if it is the same
  else change the rating
*/
