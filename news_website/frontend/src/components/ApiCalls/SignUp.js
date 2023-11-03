import { BASE_URL } from "../../store/baseURLS";

export const accountCreation = async (first_name, last_name, email, token) => {
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
};
