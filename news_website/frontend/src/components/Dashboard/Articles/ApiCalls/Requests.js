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

export const CreateNewArticle = async ({headline, article_description, article_body, visibility, isPrivate}) => {
  const url = `${BASE_URL}/api/CreateNewArticle/`
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localStorage?.getItem('token')
  }
  const body = {
    headline,
    article_description,
    article_body,
    visibility,
    isPrivate,
  }
  const response = await fetch(url, {method: "POST", headers, body})
  return response.json();
}

export const UpdateArticle = async(key, headline, article_description, article_body, visibility, isPrivate ) => {
  const url = `${BASE_URL}/api/UpdateArticle/`
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localStorage?.getItem('token')
  }
  const body = {
    key,
    headline,
    article_description,
    article_body,
    visibility,
    isPrivate,
  }
  const response = await fetch(url, {method: "POST", headers, body})
  return response.json();
}