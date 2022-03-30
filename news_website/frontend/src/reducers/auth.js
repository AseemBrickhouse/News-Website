import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authSTART = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authSUCCESS = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    })
}

const authFAIL = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLOGOUT = (state, action) =>{
    return updateObject(state, {
        token: null
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authSTART(state, action);
        case actionTypes.AUTH_SUCCESS: return authSUCCESS(state, action);
        case actionTypes.AUTH_FAIL: return authFAIL(state, action);
        case actionTypes.AUTH_LOGOUT: return authLOGOUT(state, action);
        default:
            return state;
    }
}

export default reducer;