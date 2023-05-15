import { BASE_URL } from "../../../../store/baseURLS";

export const AllUserArticles = async () =>{
    const response = await fetch("/api/AllUserArticles/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "token": localStorage.getItem("token")
        },
    })
}
export const DeleteArticle = async (key) => {
    const response = await fetch(`/api/DeleteArticle/`, {
        method: "DELETE",
        headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json',
            "token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
            key: key,
        })
    })
}
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
