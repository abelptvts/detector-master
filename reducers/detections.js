import { fromJS } from "immutable";
import { PUSH_DETECTIONS, SET_DETECTIONS, SET_DETECTIONS_LOADING } from "../actions/types";

const initialState = fromJS({
    detections: [],
    loading: false,
});

const detections = (state = initialState, action) => {
    if (action.type === SET_DETECTIONS) {
        return state.set("detections", fromJS(action.detections));
    }

    if (action.type === SET_DETECTIONS_LOADING) {
        return state.set("loading", action.loading);
    }

    if (action.type === PUSH_DETECTIONS) {
        return state.set("detections", state.get("detections").concat(fromJS(action.detections)));
    }

    return state;
};

export default detections;
