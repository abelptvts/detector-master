import { fromJS } from "immutable";
import { PUSH_CAMERAS, SET_CAMERAS, SET_CAMERAS_LOADING } from "../actions/types";

const initialState = fromJS({
    cameras: [],
    loading: false,
});

const cameras = (state = initialState, action) => {
    if (action.type === SET_CAMERAS) {
        return state.set("cameras", fromJS(action.cameras));
    }

    if (action.type === PUSH_CAMERAS) {
        return state.set("cameras", state.get("cameras").concat(fromJS(action.cameras)));
    }

    if (action.type === SET_CAMERAS_LOADING) {
        return state.set("loading", action.loading);
    }

    return state;
};

export default cameras;
