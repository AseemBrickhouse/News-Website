import * as actionTypes from './types';
import axios from 'axios';
import { getSAVEDARTICLES, getSAVEDLOGOUT } from './savedArticles';
import { BASE_URL } from '../baseURLS';

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

export const getAuthInfoSUCCESS = account =>{
    return{
        type: actionTypes.GET_AUTH_ACCOUNT,
        account,
    }
}
export const getAuthInfoFAIL = error =>{
    return{
        type: actionTypes.GET_AUTH_ACCOUNT,
        error: error,
    }
}
export const getAuthInfo = token =>{
    return dispatch=>{
        axios.get(`${BASE_URL}/api/current_user/`,{
            headers: {
                token: token,
            }
        })
        .then(response =>{
            // console.log(response.data)
            dispatch(getAuthInfoSUCCESS(response.data))
        })
    }
}
//Couldnt get working
// export const getAuthEditSuccess = account =>{
//     return{
//         type: actionTypes.GET_AUTH_EDIT,
//         account,
//     }
// }
// export const getAuthEdit = (token) =>{
//     console.log(token)
//     return dispatch=>{
//         axios.post('http://127.0.0.1:8000/EditAccount/',{
//             token: token,
//         })
//         .then(response =>{
//             console.log(response.data)
//         })
//     }
// }
export const authLogin = (username, password) => {
    return dispatch =>{
        dispatch(authStart());
        axios.post(`${BASE_URL}/api/rest-auth/login/`, {
            username: username,
            password: password
        })
        .then(response => {
            console.log(response.data.key);
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            // window.localStorage.setItem("token",token);
            localStorage.setItem('token', response.data.key);
            // axios.defaults.headers.common['Authorization'] = token ;
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(getAuthInfo(token));
            dispatch(authSUCCESS(token));
            dispatch(getSAVEDARTICLES(token));
            dispatch(checkTimeout(3600));  
        })
        .catch(error => {
            // console.log(error)
            dispatch(authFAIL(error))
        })
    };
}
export const authSignUp = (username, email, password1, password2) => {
    return dispatch =>{
        dispatch(authStart());
        axios.post(`${BASE_URL}/api/rest-auth/registration/`, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(response => {
            const token = response.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', response.data.key);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSUCCESS(token));
            dispatch(checkTimeout(3600));
        })
        .catch(error => {
            dispatch(authFAIL(error))
        })
    };
}

export const checkTimeout = expirationTime=> {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLOGOUT());   
        }, expirationTime * 1000)
    }
}


export const authLOGOUT = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(token == undefined){
            dispatch(getAuthInfoSUCCESS("No user currently logged"))
            dispatch(authLOGOUT())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authLOGOUT())
            }else{
                axios.get(`${BASE_URL}/api/current_user/`,{
                    headers:{
                        token: token,
                    }
                })
                .then(response =>{
                    dispatch(getAuthInfoSUCCESS(response.data))
                }).catch(error =>{
                    dispatch(getAuthInfoFAIL(error))
                })
                dispatch(authSUCCESS(token));
                dispatch(checkTimeout( (expirationDate.getTime() - new Date().getTime() )/ 1000));
            }
        }
    }
}

// export const accountCreation = (username, password) =>{
//     return dispatch => {
//         axios.get('http://127.0.0.1:8000/api/Accounts/', {
//             user: username,
//             password: password
//         }).then(response =>{
//             console.log(response);
//         })
//     }
// }