import {
  SET_AUTH_STATE,
  SET_USER_PROFILE,
  UNSET_USER_PROFILE,
} from "../actions/actions";

const usersSessions = (
  state = {
    authState: {
      authenticated: false
    },
  },
  action
) => {
  switch (action.type) {
    case SET_AUTH_STATE:
      return Object.assign({}, state, {
        authState: action.authState
      })
    case SET_USER_PROFILE:
      return Object.assign({}, state, {
        profile: action.userProfile,
        userId: action.userProfile.sub.split("|")[1],
        jwt: action.jwt
      })
    case UNSET_USER_PROFILE:
      // eslint-disable-next-line no-case-declarations
      let noProfileState = Object.assign({}, state, {});
      delete noProfileState.profile;
      delete noProfileState.userId;
      delete noProfileState.jwt;
      return noProfileState;
    default:
      return state;
  }
};

export default usersSessions;
