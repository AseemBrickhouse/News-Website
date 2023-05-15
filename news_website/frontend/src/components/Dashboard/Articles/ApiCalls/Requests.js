import { BASE_URL } from "../../../../store/baseURLS";

export const handleBookMark = async(key, type) =>{
    const response = await fetch("api/HandleBookmark/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        key: key,
        type: type,
      }),
    })
}

export const AllArticles = async() => {
  const url = `${BASE_URL}/api/AllArticles/`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      token: localStorage.getItem('token')
    }
  })
  return response.json();
} 