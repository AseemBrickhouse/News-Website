import { BASE_URL } from "../../../../store/baseURLS";

export const handleBookMark = async(key, type) =>{
    const response = await fetch("/api/HandleBookmark/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        key,
        type,
      }),
    })
}

export const AllArticles = async(tags) => {
  const url = `${BASE_URL}/api/AllArticles/`
  const headers = {
    token: localStorage?.getItem('token'),
    tags,
  }
  const response = await fetch(url, {method: "GET", headers})
  return response.json();
} 

export const GetArticle = async(key) => {
  const url = `${BASE_URL}/api/GetArticle/`
  const headers = {
    token: localStorage?.getItem('token'),
    key,
  }
  const response = await fetch(url, {method: "GET", headers,})
    return response.json()
}