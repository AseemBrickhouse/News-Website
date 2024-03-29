import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    popArticles: [],
    error: null, 
    loading: false
}

const getArticleStart = (state, action)=>{
    return updateObject(state,{
        error: null,
        loading: true,
    })
}

const GETARTICLESSUCCESS = (state, action)=>{
    // console.log(state, action)
    return updateObject(state,{
        popArticles: action.popArticles,
        error: null,
        loading: false,
    })
}

const GETARTICLESFAIL = (state, action)=>{
    return updateObject(state,{
        error: action.error,
        loading: false,
    })
}

const reducer = (state=initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.GET_ARTICLES_SUCCESS: return GETARTICLESSUCCESS(state, action);
        case actionTypes.GET_ARTICLES_FAIL: return GETARTICLESFAIL(state, action);
        default:
            return state;
    }
}
export default reducer;