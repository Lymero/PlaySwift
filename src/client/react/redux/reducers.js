import { combineReducers } from "redux";
import { DISPLAY_PLAYLISTS } from "../redux/actions"

const initialState = {
    playlists: []
};

// TODO : Reducers are not intented to be used for fetching data
// Store is available anywhere by using store.getState()
// Reducers are used to modify the state.
// That means that this reducer is bad
function reducer(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_PLAYLISTS:
            // Do not mutate the state! Object.assign allows us to create a copy instead.
            return Object.assign({}, state, {
                playlists: { playlist: "hello world" }
            });
        default:
            // Returns the initial state if the action is unknown
            return state;
    }
}

export default reducer;
