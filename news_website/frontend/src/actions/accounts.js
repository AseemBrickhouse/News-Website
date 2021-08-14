import axios from 'axios';
import { GET_ACCOUNT } from "./types";

//Get account
export const getaccount = () => dispatch => {
    axios.get('api/account')
    .then(response => {
        dispatch({
            type: GET_ACCOUNT,
            payload: response.data,
        });
    }).catch(error => {
        console.log(error)
    });
}
