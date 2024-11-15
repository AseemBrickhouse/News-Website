import { BASE_URL } from "../../store/baseURLS";
const token = localStorage?.getItem("token");
export const GetArticleRating = async (article_id) => {
  const url = `${BASE_URL}/api/articles/${article_id}/rating/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "GET", headers });
  return await response.json();
};

export const CreateArticleRating = async (article_id, type) => {
  const url = `${BASE_URL}/api/articles/${article_id}/rating/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    type,
  });
  const response = await fetch(url, { method: "POST", headers, body });
  return response;
};

export const UpdateArticleRating = async (article_id, type) => {
  const url = `${BASE_URL}/api/articles/${article_id}/rating/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    type,
  });
  const response = await fetch(url, { method: "PUT", headers, body });
  return response;
};

export const DeleteArticleRating = async (article_id) => {
  const url = `${BASE_URL}/api/articles/${article_id}/rating/`;
  const headers = {
    token,
    "Content-Type": "application/json",
  };
  const response = await fetch(url, { method: "DELETE", headers });
  return response;
};
