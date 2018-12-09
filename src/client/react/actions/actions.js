export const SET_USER_PROFILE = "SET_USER_PROFILE";
export function setUserProfile(userProfile, jwt) {
  return { type: SET_USER_PROFILE, userProfile, jwt };
}

export const UNSET_USER_PROFILE = "UNSET_USER_PROFILE";
export function unsetUserProfile() {
  return { type: UNSET_USER_PROFILE };
}
export const SET_AUTH_STATE = "SET_AUTH_STATE";
export function setAuthState(authState) {
  return { type: SET_AUTH_STATE, authState };
}