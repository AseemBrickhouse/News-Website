import React, { useState, useEffect } from "react";
import * as articleRatingApi from "../../Services/ApiCalls/ArticleRatingApi";

const useGetArticleRatingFetcher = (article_id) => {
  const [articleRating, setArticleRating] = useState({
    upvote_count: 0,
    downvote_count: 0,
    current_article_rating_vote: null,
  });
  useEffect(() => {
    const fetchRating = async () => {
      const response = await articleRatingApi.GetArticleRating(article_id);
      setArticleRating(response);
    };
    fetchRating();
  }, [article_id]);
  return [articleRating, setArticleRating];
};
export default useGetArticleRatingFetcher;
