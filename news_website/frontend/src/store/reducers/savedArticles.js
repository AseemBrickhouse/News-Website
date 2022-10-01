import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    saved: [],
    error: null,
    loading: false,
}

const startGETSAVED = (state, action)=>{
    return updateObject(state,{
        error: null,
        loading: true,
    })
}

const getSAVEDSUCCESS = (state, action)=>{
    return updateObject(state,{
        saved: action.payload,
        error: null,
        loading: false,
    })
}

const getSAVEDFAIL = (state, action)=>{
    return updateObject(state,{
        error: action.error,
        loading: false,
    })
}
const getSAVEDLOGOUT=(state, action)=>{
    return updateObject(state, {
        saved: action.payload,
        loading: false,
    })
}
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SAVED_ARTICLES_SUCCESS: return getSAVEDSUCCESS(state, action);
        case actionTypes.GET_SAVED_ARTICLES_FAIL: return getSAVEDFAIL(state, action);
        case actionTypes.GET_SAVED_ARTICLES_START: return startGETSAVED(state, action);
        case actionTypes.GET_SAVED_LOGOUT: return getSAVEDLOGOUT(state, action)
        default:
            return state;
    }
}
export default reducer;