import { fromJS } from "immutable";
import { SET_DETECTIONS, SET_DETECTIONS_LOADING } from "../actions/types";

const initialState = fromJS({
    detections: {},
    loading: false,
});

const detections = (state = initialState, action) => {
    if (action.type === SET_DETECTIONS) {
        return state.set("detections", fromJS(action.detections));
    }

    if (action.type === SET_DETECTIONS_LOADING) {
        return state.set("loading", action.loading);
    }

    // if (action.type === DELETE_DETECTION) {
    //     return state.set("detections", state.get("detections").delete(action.id));
    // }

    return state;
};

export default detections;
