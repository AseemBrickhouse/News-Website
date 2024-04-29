import React, { useState, useEffect } from "react";
import * as accountApi from "../../Services/ApiCalls/AccountApi";

const useAccountArticleFetcher = ({key}) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        if (key !== undefined) {
            const fetchArticles = async () => {
                const response = await accountApi.getUserArticles(key)
                setArticles(response);
            }
            fetchArticles();
        }
    },[key])
    return articles;
}
export default useAccountArticleFetcher;
