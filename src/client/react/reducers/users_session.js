import { SET_CURRENT_USER } from "../actions/actions";

const usersSessions = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        current_user: action.current_user
      };
    default:
      return state;
  }
};

export default usersSessions;
