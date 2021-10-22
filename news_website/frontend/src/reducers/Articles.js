import { GET_ARTICLES } from '../actions/types.js';

const initialState = {
    articles: []
};

export default function(state=initialState, action){
    switch(action.type){
        case GET_ACCOUNT:
            return {
                ...state,
                articles: action.payload,       
            };
            default:
                return state;
    }
}