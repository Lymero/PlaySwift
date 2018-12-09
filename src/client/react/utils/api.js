import Auth from "react/services/auth0.js";

function sendApiRequest({ url, method = "GET", params = null }) {
  const jwt = Auth.getJWT();
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + jwt);

  function handleResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  }

  return fetch(url, {
    method: method,
    headers: headers,
    body: params && JSON.stringify(params)
  }).then(handleResponse);
}

export default sendApiRequest;
