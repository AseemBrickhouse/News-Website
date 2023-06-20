import * as actionTypes from './types';
import axios from 'axios';
import { BASE_URL } from '../baseURLS';

export const articleStart = () =>{
    return{
        type: actionTypes.GET_ARTICLES_START,
    };
}
export const articleSUCCESS = (data1, data2) =>{
    // console.log(data)
    return{
        type: actionTypes.GET_ARTICLES_SUCCESS,
        allArticles: data1,
        popArticles: data2,
    };
}
export const articleFAIL = (error) =>{
    return{
        type: actionTypes.GET_ARTICLES_FAIL,
        error: error,
    };
}
export const getARTICLES = (token, tags) =>{
    return dispatch=>{
        dispatch(articleStart())
        axios.get(`${BASE_URL}/api/AllArticles/`, {
            headers:{
                token: token,
                tags: tags,
            },
        })
        .then(response=>{
            // console.log(response.data['popArticles'])
            dispatch(articleSUCCESS(response.data['allArticles'], response.data['popArticles']))
        })
        .catch(error =>{
            dispatch(articleFAIL(error))
        })
    }
}