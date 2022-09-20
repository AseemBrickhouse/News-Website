import * as actionTypes from './types';
import axios from 'axios';

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
    // console.log(action)
    return dispatch=>{
        dispatch(startGETARTICLES())
        axios.post('http://127.0.0.1:8000/api/AllArticles/', {
            token: token,
        })
        .then(response=>{
            console.log(response.data['popArticles'])
            dispatch(articleSUCCESS(response.data['allArticles'], response.data['popArticles']))
        })
        .catch(error =>{
            dispatch(articleFAIL(error))
        })
    }
}