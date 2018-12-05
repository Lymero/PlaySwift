export const DISPLAY_PLAYLISTS = "DISPLAY_PLAYLISTS";
export function displayPlaylists() {
  return { type: DISPLAY_PLAYLISTS };
}

export const LOAD_PLAYLISTS = "LOAD_PLAYLISTS";
export function loadPlaylists() {
  return { type: LOAD_PLAYLISTS };
}

export const SET_CURRENT_USER = "SET_CURRENT_USER";
export function addCurrentUser(current_user) {
  return { type: SET_CURRENT_USER, current_user };
}
