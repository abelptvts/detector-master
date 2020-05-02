import { fromJS } from "immutable";
import {
    PUSH_CAMERAS,
    REMOVE_CAMERA,
    SET_CAMERAS,
    SET_CAMERAS_LOADING,
    UPDATE_CAMERA,
} from "../actions/types";

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

    if (action.type === UPDATE_CAMERA) {
        const idx = state.get("cameras").findIndex((c) => c.get("id") === action.id);
        if (idx === -1) {
            return state;
        }
        return state.setIn(
            ["cameras", idx],
            state.getIn(["cameras", idx]).set("enabled", action.enabled)
        );
    }

    if (action.type === REMOVE_CAMERA) {
        return state.set(
            "cameras",
            state.get("cameras").filter((c) => c.get("id") !== action.id)
        );
    }

    return state;
};

export default cameras;
