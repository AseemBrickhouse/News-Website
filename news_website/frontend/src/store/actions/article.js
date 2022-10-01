import * as actionTypes from './types';
import axios from 'axios';
import { BASE_URL } from '../baseURLS';

export const startGETARTICLES = () =>{
    return{
        type: actionTypes.GET_ARTICLES
    };
}
export const articleSUCCESS = (data1, data2) =>{
    // console.log(data)
    return{
        type: actionTypes.GET_ARTICLESSUCCESS,
        allArticles: data1,
        popArticles: data2,
    };
}
export const articleFAIL = (error) =>{
    return{
        type: actionTypes.GET_ARTICLESFAIL,
        error: error,
    };
}
export const getARTICLES = (token) =>{
    return dispatch=>{
        dispatch(startGETARTICLES()) 
        axios.post(`${BASE_URL}/api/AllArticles/`, {
            token: token,
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