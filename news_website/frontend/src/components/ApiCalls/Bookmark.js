import { BASE_URL } from "../../store/baseURLS";

export const handleBookMark = async(key, type) => {
    const url = `${BASE_URL}/api/HandleBookmark/`
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage?.getItem('token'),
    }
    const body = JSON.stringify({
        key, 
        type,
    })
    const response = await fetch(url, {method: "PUT", headers, body})
}
