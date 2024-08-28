import * as actionTypes from "./types";
import axios from "axios";
import { BASE_URL } from "../baseURLS";

export const startGetSaved = () => {
  return {
    type: actionTypes.GET_SAVED_ARTICLES_START,
  };
};
export const getSavedFail = (error) => {
  return {
    type: actionTypes.GET_SAVED_ARTICLES_FAIL,
    error: error,
  };
};
export const getSavedSuccess = (data) => {
  return {
    type: actionTypes.GET_SAVED_ARTICLES_SUCCESS,
    payload: data,
  };
};

export const getSavedArticles = (account_id, token) => {
  return (dispatch) => {
    console.log(token);
    dispatch(startGetSaved());
    axios
      .get(`${BASE_URL}/api/account/${account_id}/articles/saved/`, {
        headers: {
          token: token,
          asd: "Test",
        },
      })
      .then((response) => {
        dispatch(getSavedSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getSavedFail(error));
      });
  };
};
export const getSavedLogout = () => {
  return {
    type: actionTypes.GET_SAVED_LOGOUT,
    payload: null,
  };
};
