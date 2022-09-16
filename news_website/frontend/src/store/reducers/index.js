import AuthReducer from './auth';
import ArticleListReducer from './article';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: AuthReducer,
    articles: ArticleListReducer,
});

export default rootReducer;