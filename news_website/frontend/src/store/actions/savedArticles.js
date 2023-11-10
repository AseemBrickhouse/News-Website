import * as actionTypes from './types';
import axios from 'axios';
import { BASE_URL } from '../baseURLS';

export const startGetSaved = () =>{
    return{
        type: actionTypes.GET_SAVED_ARTICLES_START
    }
}
export const getSavedFail = (error)=>{
    return{
        type: actionTypes.GET_SAVED_ARTICLES_FAIL,
        error: error,
    };
}
export const getSavedSuccess = (data) =>{
    return{
        type: actionTypes.GET_SAVED_ARTICLES_SUCCESS,
        payload: data
    }
}

//TODO: Rewrite
// url should look like account/articles/saved
export const getSavedArticles = (token) =>{
    return dispatch=>{
        dispatch(startGetSaved())
        axios.get(`${BASE_URL}/api/SavedArticles/`, {
            headers: {
                token: token,
            },
        })
        .then(response=>{
            dispatch(getSavedSuccess(response.data))
        }).catch(error =>{
            dispatch(getSavedFail(error))
        })
    }
}
export const getSavedLogout = () =>{
    console.log("here")
    return {
        type: actionTypes.GET_SAVED_LOGOUT,
        payload: null
    }
}