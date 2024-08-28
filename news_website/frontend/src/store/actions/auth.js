import * as actionTypes from "./types";
import axios from "axios";
import { getSavedArticles, getSavedLogout } from "./savedArticles";
import { BASE_URL } from "../baseURLS";
import * as accountAPI from "../../Services/ApiCalls/AccountApi";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const getAuthInfoSuccess = (account) => {
  return {
    type: actionTypes.GET_AUTH_INFO_SUCCESS,
    account,
  };
};
export const getAuthInfoFail = (error) => {
  return {
    type: actionTypes.GET_AUTH_INFO_FAIL,
    error: error,
  };
};

export const getAuthInfo = ({ data }) => ({
  type: actionTypes.GET_AUTH_ACCOUNT,
  data,
});

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${BASE_URL}/api/rest-auth/login/`, {
        username: username,
        password: password,
      })
      .then((tokenResponse) => {
        const token = tokenResponse.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        const config = { headers: { token, scope: "current-user" } };
        axios
          .get(`${BASE_URL}/api/account/`, config)
          .then((accountResponse) => {
            localStorage.setItem("token", tokenResponse.data.key);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(getAuthInfoSuccess(accountResponse.data));
            dispatch(authSuccess(token));
            dispatch(getSavedArticles(accountResponse.key, token));
            dispatch(checkTimeout(3600));
          })
          .catch((error) => {
            dispatch(authFail(error));
          });
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authSignUp = (username, email, password1, password2) => {
  const url = `${BASE_URL}/api/rest-auth/registration/`;
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    username: username,
    email: email,
    password1: password1,
    password2: password2,
  });
  return async (dispatch) => {
    dispatch(authStart());
    try {
      const response = await fetch(url, { method: "POST", headers, body });
      const data = await response.json();
      if (!response.ok) {
        dispatch(authFail(data));
      } else {
        const token = data.key;
        console.log(token);
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkTimeout(3600));
      }
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const checkTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLOGOUT());
    }, expirationTime * 1000);
  };
};

export const authLOGOUT = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token == undefined) {
      dispatch(getAuthInfoSuccess("No user currently logged in."));
      dispatch(authLOGOUT());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLOGOUT());
      } else {
        const config = { headers: { token, scope: "current-user" } };
        axios
          .get(`${BASE_URL}/api/account/`, config)
          .then((response) => {
            dispatch(getAuthInfoSuccess(response.data));
          })
          .catch((error) => {
            dispatch(getAuthInfoFail(error));
          });
        dispatch(authSuccess(token));
        dispatch(
          checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};

export const updateAuthInformation = (updatedAccountInformation) => {
  return (dispatch) => {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(authLOGOUT());
    }
    dispatch(getAuthInfoSuccess(updatedAccountInformation));
    dispatch(
      checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};
