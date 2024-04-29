import { BASE_URL } from "../../store/baseURLS";
import validatePassword  from "../../components/Utility";

export const getUserArticles = async (account_id) => {
  console.log(account_id)
  const url = `${BASE_URL}/api/account/${account_id}/articles/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem("token"),
  };
  const response = await fetch(url, { method: "GET", headers });
  return response.json();
};

export const createAccount = async(first_name, last_name, email, token) => {
  const url = `${BASE_URL}/api/account/`;
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token,
  };
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
  });
  const response = await fetch(url, { method: "POST", headers, body });
  return response;
}

export const getAllUsers = async() => {
  const url = `${BASE_URL}/api/account/`
  const headers = {
    'Accept':'application/json',
    'Content-Type': 'application/json',
    'token': localStorage.getItem('token'),
}
  const response = await fetch(url, {method: "GET", headers})
  return response.json();
}
export const GetPerson = async (account_id) => {
  const url = `${BASE_URL}/api/account/${account_id}/`
  const headers = {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token'),
  }
  const response = await fetch(url, {method: "GET", headers})
  return response.json();
};

export const GetReporterArticles = async (person) => {
  const url = `${BASE_URL}/api/GetUserArticles`
  const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      key: person.key,
      token: localStorage?.getItem('token')
  }
  const response = await fetch(url, {method: "GET", headers})
  return response.json();
};

export const EditAccount = async(account) =>{
  const url = `${BASE_URL}/api/account/`
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage?.getItem('token')
  }
  const body = JSON.stringify({
    "first_name":account.first_name,
    "last_name": account.last_name,
    "phone": account.phone,
    "bio": account.bio,
    "email": account.email,
    "occupation": account.occupation,
  })
  const response = await fetch(url, {method: "PUT", headers, body});
  return response.json();
}

export const ChangePassword = async(oldPassword, newPassword1, newPassword2) => {
  if(oldPassword === newPassword1) return {"error" : "Old password cannot be used as the new password!"}
  const isValid = validatePassword(newPassword1, newPassword2);

}

export const ChangeUsername = async(currentUsername, newUsername) => {

}