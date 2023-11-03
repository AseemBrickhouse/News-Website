import { BASE_URL } from "../../store/baseURLS";

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