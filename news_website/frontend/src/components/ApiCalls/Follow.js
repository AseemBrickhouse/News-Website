import { BASE_URL } from "../../store/baseURLS";

export const handleFollow = async (person) => {
    const url = `${BASE_URL}/api/Follow`
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
    }
    const body = JSON.stringify({
        person,
    })
    const response = await fetch(url, {method: "POST", headers, body})
    return response.json()
    // const response = await fetch("/api/Follow/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     token: localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     person: person,
    //   }),
    // });
    // return await response.json();
  
  };
  
  export const handleUnFollow = async (person) => {
    const url = `${BASE_URL}/api/unFollow`
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
    }
    const body = JSON.stringify({
        person,
    })
    const response = await fetch(url, {method: "DELETE", headers, body})
    // const response = await fetch("/api/unFollow/", {
    //   method: "DELETE",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     token: localStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     person: person,
    //   }),
    // });
    return await response.json();
  
  };