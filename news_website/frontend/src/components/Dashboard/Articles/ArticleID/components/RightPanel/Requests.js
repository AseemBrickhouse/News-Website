export const GetPerson = async (person) => {
  const response = await fetch("/api/GetPerson/", {
    method: "GET",
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('token'),
      'firstName': person.first_name,
      'lastName': person.last_name,
      'email': person.email,
    },
  });
  return response.json();
};

export const GetReporterArticles = async (person) => {
  const response = await fetch("/api/GetUserArticles/", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      key: person.key,
      token: localStorage?.getItem('token')
    },
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
