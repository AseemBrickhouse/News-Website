import { BASE_URL } from "../../store/baseURLS";

export const getUserArticles = async (account_id) => {
  const url = `${BASE_URL}/api/accounts/${account_id}/articles/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};
