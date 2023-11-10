import * as actionTypes from "../actions/types";
import { updateObject } from "../utility";

const initialState = {
  saved_articles: [],
  error: null,
  loading: false,
};

const startGetSaved = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getSavedSuccess = (state, action) => {
  return updateObject(state, {
    saved_articles: action.payload,
    error: null,
    loading: false,
  });
};

const getSavedFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const getSavedLogout = (state, action) => {
  return updateObject(state, {
    saved_articles: action.payload,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SAVED_ARTICLES_SUCCESS:
      return getSavedSuccess(state, action);
    case actionTypes.GET_SAVED_ARTICLES_FAIL:
      return getSavedFail(state, action);
    case actionTypes.GET_SAVED_ARTICLES_START:
      return startGetSaved(state, action);
    case actionTypes.GET_SAVED_LOGOUT:
      return getSavedLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
