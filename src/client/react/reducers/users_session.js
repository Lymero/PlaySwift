import { SET_CURRENT_USER } from "react/actions/actions";
import { SET_AUTH_STATE } from "react/actions/actions";

const usersSessions = (
  state = {
    authState: {
      authenticated: false
    }
  },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        current_user: action.current_user
      };
    case SET_AUTH_STATE:
      return {
        authState: action.authState
      };
    default:
      return state;
  }
};

export default usersSessions;
