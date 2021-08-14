import { GET_ACCOUNT } from '../actions/types.js';

const initialState = {
    account: []
};

export default function(state=initialState, action){
    switch(action.type){
        case GET_ACCOUNT:
            return {
                ...state,
                account: action.payload,       
            };
            default:
                return state;
    }
}