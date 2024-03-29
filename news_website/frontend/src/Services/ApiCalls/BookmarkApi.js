import { BASE_URL } from "../../store/baseURLS";


export const handleBookMark = async(article_id, type) => {
    const url = `${BASE_URL}/api/articles/${article_id}/bookmark/`
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage?.getItem('token'),
    }
    const body = JSON.stringify({
        type,
    })
    const response = await fetch(url, {method: "PUT", headers, body})
}
