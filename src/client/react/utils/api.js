import rootStore from "react/reducers/root";
import { createNotification } from "./notifs";

function sendApiRequest({ url, method = "GET", params = null }) {
  const reduxJWT = rootStore.getState().usersSession.jwt;
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer " + reduxJWT);

  function handleResponse(response) {
    errorToNotification(response.status, response.statusText);
    return response.json();
  }

  function errorToNotification(status, message) {
    switch (status) {
      case 400:
        createNotification("info", message);
        break;
      case 404:
        createNotification("warning", message);
        break;
      case 500:
        createNotification("error", message);
        break;
      case 201:
        createNotification("success", message);
        break;
    }
  }

  return fetch(url, {
    method: method,
    headers: headers,
    body: params && JSON.stringify(params)
  }).then(handleResponse);
}

export default sendApiRequest;
