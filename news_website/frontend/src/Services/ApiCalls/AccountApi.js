import { BASE_URL } from "../../store/baseURLS";

export const getUserArticles = async (account_id) => {
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
  const url = `${BASE_URL}/api/AccountCreation/`;
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

export const GetPerson = async (person) => {
  const url = `${BASE_URL}/api/GetPerson`
  const headers = {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token'),
      'firstName': person.first_name,
      'lastName': person.last_name,
      'email': person.email,
  }
  const response = await fetch(url, {method: "GET", header})
  // const response = await fetch("/api/GetPerson/", {
  //   method: "GET",
  //   headers: {
  //     'Accept':'application/json',
  //     'Content-Type': 'application/json',
  //     'token': localStorage.getItem('token'),
  //     'firstName': person.first_name,
  //     'lastName': person.last_name,
  //     'email': person.email,
  //   },
  // });
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
  // const response = await fetch("/api/GetUserArticles/", {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     key: person.key,
  //     token: localStorage?.getItem('token')
  //   },
  // });
  return response.json();
};