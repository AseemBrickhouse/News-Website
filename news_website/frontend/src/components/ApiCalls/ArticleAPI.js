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
  const url = `${BASE_URL}/api/${key}/`;
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
  console.log(isPrivate);
  const url = `${BASE_URL}/api/articles/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  };
  //Extract keys from tag
  const extractedTagKeys = Object.keys(tags);
  const body = JSON.stringify({
    headline,
    article_description,
    article_body,
    visibility,
    isPrivate,
    tags: extractedTagKeys,
  });
  const response = await fetch(url, { method: "POST", headers, body });
  return await response.json();
};

export const UpdateArticle = async (
  article_key,
  headline,
  article_description,
  article_body,
  visibility,
  isPrivate
) => {
  const url = `${BASE_URL}/api/${article_key}/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  };
  const body = {
    article_key,
    headline,
    article_description,
    article_body,
    visibility,
    isPrivate,
  };
  const response = await fetch(url, { method: "POST", headers, body });
  return response.json();
};

export const GetArticleTags = async () => {
  const url = `${BASE_URL}/api/tags/`;
  const response = await fetch(url, { method: "GET" });
  return response.json();
};
