import React, { useState, useEffect } from "react";
import * as accountApi from "../../Services/ApiCalls/AccountApi";

const useAccountArticleFetcher = (account_id) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await accountApi.getUserArticles(account_id);
            setArticles(response);
        }
        fetchArticles();
    },[])

    return articles;
}
export default useAccountArticleFetcher;