import { fromJS } from "immutable";
import { SET_CAMERAS, SET_CAMERAS_LOADING } from "../actions/types";

const initialState = fromJS({
    cameras: {},
    loading: false,
});

const cameras = (state = initialState, action) => {
    if (action.type === SET_CAMERAS) {
        const camerasMap = {};
        action.cameras.forEach((camera) => {
            camerasMap[camera.id] = camera;
        });
        return state.set("cameras", fromJS(camerasMap));
    }

    if (action.type === SET_CAMERAS_LOADING) {
        return state.set("loading", action.loading);
    }

    return state;
};

export default cameras;
