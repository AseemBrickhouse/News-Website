import React, { useEffect, useState } from "react";

//Filter between isPrivate: false -> public | true ->  private
//The "Condition" to filter by is in parent (did it like this for future uses)
const useArticleFilter = (account_articles, field, condition) => {
  const [filteredArticles, setFilteredArticles] = useState({});
  useEffect(() => {
    const filterObject = () => {
      const result = {};
      account_articles &&
        Object.entries(account_articles).filter(([key, value]) => {
          if (value[field] == condition) {
            result[key] = value;
          }
        });
      return result;
    };
    const filteredArticleObjects = filterObject();
    setFilteredArticles(filteredArticleObjects);
  }, [account_articles,field, condition]);
  return [filteredArticles, setFilteredArticles];
};
export default useArticleFilter;
