export const LOAD_PLAYLISTS = "LOAD_PLAYLISTS";
export function loadPlaylists() {
  return { type: LOAD_PLAYLISTS };
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export function setCurrentUser(current_user) {
  return { type: SET_CURRENT_USER, current_user };
}

export const SET_AUTH_STATE = "SET_AUTH_STATE";
export function setAuthState(authState) {
  return { type: SET_AUTH_STATE, authState };
}