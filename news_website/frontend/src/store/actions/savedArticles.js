import * as actionTypes from './types';
import axios from 'axios';

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
        axios.post('http://127.0.0.1:8000/api/SavedArticles/', {
            token: token,
        })
        .then(response=>{
            // console.log(response.data)
            dispatch(getSAVEDSUCCESS(response.data))
        }).catch(error =>{
            dispatch(getSAVEDFAIL(error))
        })
    }
}