import React, { useState, useEffect } from "react";
import * as commentAPI from "../ApiCalls/Comment";

const UseCommentFetcher = (article) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetchComments();
    },[article])

    const fetchComments =  async () => {
        const response = await commentAPI.GetComments(article.key);
        setComments(response)
    }

    const fetchUpdatedComments = () => {
        fetchComments();
    };

    return { comments, fetchUpdatedComments };
}
export default UseCommentFetcher;