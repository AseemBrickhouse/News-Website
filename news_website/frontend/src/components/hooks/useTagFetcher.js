import React, { useEffect, useState } from "react";
import * as articleAPI from "../ApiCalls/ArticleAPI";
import TagList from "../TagList/TagList";

const useTagFetcher = () => {
    const [tags, setTags] = useState([]);
    useEffect(()=> {
        const fetchTags = async() => {
            const response = await articleAPI.GetArticleTags();
            setTags(response)
        }
        fetchTags();
    },[])
    return tags;
}
export default useTagFetcher;