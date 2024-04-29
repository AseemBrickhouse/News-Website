import React, { useState, useEffect } from "react";
import * as articleAPI from "../../Services/ApiCalls/ArticleApi";
const useArticleFetcher = () => {
    const [articles, setArticles] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await articleAPI.AllArticles() 
            setArticles(response);
        }
        fetchArticles();
    },[])

    return articles;
}
export default useArticleFetcher;