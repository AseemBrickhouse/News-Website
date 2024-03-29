import { BASE_URL } from "../../store/baseURLS";

export const AllArticles = async (tags) => {
  const url = `${BASE_URL}/api/articles/`;
  const headers = {
    token: localStorage?.getItem("token"),
    tags,
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const GetArticle = async (key) => {
  const url = `${BASE_URL}/api/articles/${key}`;
  const headers = {
    token: localStorage?.getItem("token"),
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const CreateNewArticle = async (
  { headline, article_description, article_body, visibility, tags },
  isPrivate
) => {
  const url = `${BASE_URL}/api/articles/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  };
  //Extract keys from tag
  const extractedTagKeys = Object.keys(tags);
  console.log(extractedTagKeys)
  const body = JSON.stringify({
    headline,
    article_description,
    article_body,
    visibility,
    isPrivate,
    tags: extractedTagKeys,
  });
  console.log(body)

  const response = await fetch(url, { method: "POST", headers, body });
  return await response.json();
};

export const UpdateArticle = async ({  
  key,
  headline,
  article_description,
  article_body,
  visibility,
  isPrivate,
  tags,
}) => {
  const url = `${BASE_URL}/api/articles/${key}/`;
  const extractedTagKeys = Object.keys(tags);
  console.log(extractedTagKeys)
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  };
  const body = JSON.stringify({
    headline,
    article_description,
    article_body,
    visibility,
    isPrivate,
    key,
    tags: extractedTagKeys,
  });
  console.log(extractedTagKeys)
  const response = await fetch(url, { method: "PUT", headers, body });
  // return response.json();
};

export const GetArticleTags = async () => {
  const url = `${BASE_URL}/api/tags/`;
  const response = await fetch(url, { method: "GET" });
  return response.json();
};


export const DeleteArticle = async({key}) => {
  const url = `${BASE_URL}/api/articles/${key}/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  }
  const body = JSON.stringify({key})
  console.log(body)
  const response = await fetch(url, { method: "DELETE", headers, body  });
}

export const CreateArticleRating = async (article_key, rating, type) => {
  const url = `${BASE_URL}/api/articles/${article_key}/rating/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    rating,
    type,
  });
  const response = await fetch(url, {method: "POST", headers, body})
  return response;
}