import { BASE_URL } from "../../store/baseURLS";

export const GetArticleTags = async () => {
    const url = `${BASE_URL}/api/tags/`;
    const response = await fetch(url, { method: "GET" });
    return response.json();
  };