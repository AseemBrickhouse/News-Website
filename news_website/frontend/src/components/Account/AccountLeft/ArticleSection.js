import React from "react";
import ArticleEntry from "../../ArticleEntry/ArticleEntry";
import useAccountArticleFetcher from "../../hooks/useAccountArticleFetcher";

const ArticleSection = ({field, condition, person}) => {
  const filterObject = () => {
    const newObj = {}
    account_articles  && Object.entries(account_articles).filter(([key, value]) => {
        if(value[field] == condition){
          newObj[key] = value
        }
      })
    return newObj;
  }
  //TODO: Move one layer up and fix the bug where the first click of a person gets the articles but they still remain after you click "View Profile". 
  const {account_articles} = useAccountArticleFetcher(person.key);
  const filteredArticleObjects = filterObject();
  return (
    <div>
      {account_articles &&
        Object.entries(filteredArticleObjects).map(([key, article]) => {
          return (
            <ArticleEntry
              article={article}
              reporter={article.reporter_account}
              articleKey={key}
            />
          );
        })}
    </div>
  );
};
export default ArticleSection;
