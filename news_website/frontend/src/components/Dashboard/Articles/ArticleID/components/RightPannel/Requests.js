export const GetPerson = async (person) => {
  const response = await fetch("/api/GetPerson/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("token"),
      first_name: person.first_name,
      last_name: person.last_name,
      email: person.email,
    }),
  });
  return response.json();
};

export const GetReporterArticles = async (person) => {
  const response = await fetch("/api/GetUserArticles/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key: person.key,
    }),
  });
  return response.json();
};

export const handleBookMark = async (key) => {
  const response = await fetch("api/Bookmark/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      ...key,
      token: localStorage.getItem("token"),
    },
  });
  return await response.json();
};

export const handleFollow = async (person) => {
  const response = await fetch("/api/Follow/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      person: person,
    }),
  });
  return await response.json();

};

export const handleUnFollow = async (person) => {
  const response = await fetch("/api/unFollow/", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      person: person,
    }),
  });
  return await response.json();

};
