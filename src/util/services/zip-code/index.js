import { API_URL_ZIPCODE } from "Constants/defaultValues";

export function searchAddressByZipCode(zipCode) {
  if (!zipCode) return;
  const token = getToken();
  if (!token) {
    return getTokenAPI()
      .then(response => {
        localStorage.setItem("token-cep", response.token);
      })
      .then(() => fetchZipCode(zipCode))
      .catch(response => {
        localStorage.removeItem("token-cep");
      });
  }
  return fetchZipCode(zipCode);
}

function getTokenAPI() {
  const credentials = JSON.stringify({
    username: "acert",
    password: "acert"
  });
  const url = `${API_URL_ZIPCODE}/login`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: credentials
  }).then(res => res.json());
}

function fetchZipCode(zipCode) {
  const token = getToken();
  const url = `${API_URL_ZIPCODE}/cep/${zipCode}`;
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json());
}

function getToken() {
  return localStorage.getItem("token-cep");
}
