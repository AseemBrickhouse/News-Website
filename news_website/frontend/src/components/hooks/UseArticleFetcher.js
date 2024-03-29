import React, { useState, useEffect } from "react";
import * as articleAPI from "../ApiCalls/ArticleAPI";

const UseArticleFetcher = () => {
    const [articles, setArticles] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await articleAPI.AllArticles();
            const token = localStorage.getItem("token")
            setArticles(response);
        }
        fetchArticles();
    },[])

    return articles;
}
export default UseArticleFetcher;