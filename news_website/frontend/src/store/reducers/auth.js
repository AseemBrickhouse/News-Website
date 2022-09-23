import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    account: [],
    error: null, 
    loading: false
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        account: "No account currently logged in",
    });
}

const getAuthInfoSUCCESS = (state, action)=>{
    return updateObject(state,{
        account: action.account,
    });
}

//Couldnt get working
// const getAuthEditSuccess = (state, action) =>{
//     console.log(action)
//     return updateObject(state,{
//         account: action.account,
//     })
// }
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);   
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.GET_AUTH_ACCOUNT: return getAuthInfoSUCCESS(state, action);
        //Couldnt get working on main page side
        // case actionTypes.GET_AUTH_EDIT: return getAuthEditSuccess(state, action);

        default:
            return state;
    }
}

export default reducer;