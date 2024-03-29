import React, { useEffect, useState } from "react";
import * as articleAPI from "../../Services/ApiCalls/TagApi";

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