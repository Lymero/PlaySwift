import rootStore from "react/reducers/root";

function sendApiRequest({ url, method = "GET", params = null }) {
  const reduxJWT = rootStore.getState().usersSession.jwt;
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + reduxJWT);

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
