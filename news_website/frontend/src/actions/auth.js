import { SettingsSystemDaydream } from '@material-ui/icons';
import * as actionTypes from './types';
import axios from axios

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
}

export const authSUCCESS = token =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token
    };
}

export const authFAIL = (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const authLogin = (username, password) => {
    return dispatch =>{
        dispatch(authStart());
        axios.post('https://127.0.0.1:8000/rest-auth/login/', {
            username: username,
            password: password
        })
        .then(response => {
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSUCCESS(token));
            dipatch(checkTimeout(3600));
        })
        .catch(error => {
            dispatch(authFAIL(error))
        })
    };
}

export const authSignUp = (username, email, password1, password2) => {
    return dispatch =>{
        dispatch(authStart());
        axios.post('https://127.0.0.1:8000/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(response => {
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSUCCESS(token));
            dipatch(checkTimeout(3600));
        })
        .catch(error => {
            dispatch(authFAIL(error))
        })
    };
}

export const checkTimeout = expirationTime=> {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLOGOUT);
        }), expirationTime * 1000
    };
}


export const authLOGOUT = () =>{
    localStorage.removeItem('user');s
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}