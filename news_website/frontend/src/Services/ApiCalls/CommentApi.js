import { BASE_URL } from "../../store/baseURLS";

const token = localStorage?.getItem("token");

export const GetComments = async (article_key) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/`;
  const headers = {
    token,
    articleKey: article_key,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const CreateComment = async (article_key, content, parent_id) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/`;
  const headers = {
    token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    content,
    parent_id,
  });
  const response = await fetch(url, { method: "POST", headers, body });
};

export const DeleteComment = async (comment_id, article_key) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/${comment_id}/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    article_key,
    comment_id,
  });
  const response = await fetch(url, { method: "DELETE", headers, body });
};

export const UpdateComment = async (comment_id, article_key, content) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/${comment_id}/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    content,
  });
  const response = await fetch(url, { method: "PUT", headers, body });
};

export const GetUserComments = async (account_id, article_key) => {
  const url = `${BASE_URL}/api/account/${account_id}/comments/${article_key}/`;
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const GetChildComments = async (article_key, comment_id) => {
  const url = `${BASE_URL}/api/${article_key}/comments/${comment_id}/child`;
  const headers = {
    comment_id,
    article_key,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const GetParentComments = async (article_key, comment_id) => {
  const url = `${BASE_URL}/api/${article_key}/comments/${comment_id}/parent`;
  const headers = {
    article_key,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const AddCommentRating = async (
  comment_id,
  article_key,
  rating,
  type
) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/${comment_id}/rating/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    rating,
    type,
  });
  const response = await fetch(url, { method: "POST", headers, body });
  return response.json();
};

export const UpdateCommentRating = async (
  comment_id,
  article_key,
  rating,
  type,
  rating_id
) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/${comment_id}/rating/${rating_id}/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    rating,
    type,
  });
  const response = await fetch(url, { method: "PUT", headers, body });
};

export const DeleteCommentRating = async (
  comment_id,
  article_key,
  rating,
  type,
  rating_id
) => {
  const url = `${BASE_URL}/api/articles/${article_key}/comments/${comment_id}/rating/${rating_id}/`;
  const headers = {
    token,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    rating,
    type,
  });
  const response = await fetch(url, { method: "DELETE", headers, body });
};
