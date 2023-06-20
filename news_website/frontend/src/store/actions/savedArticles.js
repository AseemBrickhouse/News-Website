import * as actionTypes from './types';
import axios from 'axios';
import { BASE_URL } from '../baseURLS';

export const startGETSAVED = () =>{
    return{
        type: actionTypes.GET_SAVED_ARTICLES_START
    }
}
export const getSAVEDFAIL = (error)=>{
    return{
        type: actionTypes.GET_SAVED_ARTICLES_FAIL,
        error: error,
    };
}
export const getSAVEDSUCCESS = (data) =>{
    return{
        type: actionTypes.GET_SAVED_ARTICLES_SUCCESS,
        payload: data
    }
}
export const getSAVEDARTICLES = (token) =>{
    return dispatch=>{
        dispatch(startGETSAVED())
        axios.get(`${BASE_URL}/api/SavedArticles/`, {
            headers: {
                token: token,
            },
        })
        .then(response=>{
            dispatch(getSAVEDSUCCESS(response.data))
        }).catch(error =>{
            dispatch(getSAVEDFAIL(error))
        })
    }
}
export const getSAVEDLOGOUT = () =>{
    console.log("here")
    return {
        type: actionTypes.GET_SAVED_LOGOUT,
        payload: null
    }
}