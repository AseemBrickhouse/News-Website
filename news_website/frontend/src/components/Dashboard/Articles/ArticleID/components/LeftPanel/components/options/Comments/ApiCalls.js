
import { BASE_URL } from "../../../../../../../../../store/baseURLS";

const token = localStorage?.getItem('token')

export const GetComments = async(article_key) =>{
    const url = `${BASE_URL}/api/GetComments/?article_key=${article_key}`
    const response = await fetch(url, {method: "GET"})
    return response.json();
}

export const CreateComment = async(article_key, content, parent_id) => {
    const url =  `${BASE_URL}/api/CreateComment/`
    const headers = {
        token,
        'Content-Type': 'application/json',
    }
    const body = {
        article_key,
        content,
        parent_id,
    }
    const response = await fetch(url, {method: "POST", headers, body})
    return response.json()
}

export const DeleteComment = async(comment_id, article_key) =>{
    const url = `${BASE_URL}/api/DeleteComment/`
    const headers = {
        token,
        'Content-Type': 'application/json',
    }
    const body = {
        article_key,
        comment_id,
    }
    const response = await fetch(url, {method: "DELETE", headers, body})
    return response.json()
}

export const UpdateComment = async(comment_id, article_key, content) => {
    const url =`${BASE_URL}/api/UpdateComment/`
    const headers = {
        token,
        'Content-Type': 'application/json',
    } 
    const body = {
        comment_id,
        article_key,
        content,
    }
    const response = await fetch(url, {method: "PUT", headers, body})
    return response.json()
}

export const UpdateRating = async(comment_id, article_key, rating, type) => {
    const url =`${BASE_URL}/api/UpdateRating/`
    const headers = {
        token,
        'Content-Type': 'application/json',
    } 
    const body = {
        comment_id,
        article_key,
        rating: type == 'upvote' ? rating += 1 : rating -= 1,
        type
    }
    const response = await fetch(url, {method: "PUT", headers, body})
    return response.json()
}

export const GetUserComments = async(first_name, last_name, article_key, ) => {
    const url = `${BASE_URL}/api/GetUserComments/`
    const headers = {
        'Content-Type': 'application/json',
        first_name,
        last_name,
        article_key,
    }
    const response = await fetch(url, {method: "GET", headers})
    return response.json()
}

export const GetChildComments = async(comment_id, article_key) => {
    const url = `${BASE_URL}/api/GetChildComments/`
    const headers = {
        comment_id,
        article_key,
        'Content-Type': 'application/json',
    }
    const response = await fetch(url, {method: "GET", headers})
    return response.json()
}

export const GetParentComments = async(article_key) => {
    const url = `${BASE_URL}/api/GetParentComments/`
    const headers = {
        article_key,
        'Content-Type': 'application/json',
    }
    const response = await fetch(url, {method: "GET", headers})
    return response.json()
}