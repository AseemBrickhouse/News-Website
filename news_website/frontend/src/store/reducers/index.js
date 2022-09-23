import AuthReducer from './auth';
import ArticleListReducer from './article';
import SavedArticles from './savedArticles';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: AuthReducer,
    articles: ArticleListReducer,
    savedArticles: SavedArticles,
});

export default rootReducer;