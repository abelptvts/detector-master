import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger();

import cameras from "./cameras";
import masters from "./masters";
import detections from "./detections";

const reducers = combineReducers({ cameras, masters, detections });

// eslint-disable-next-line import/no-mutable-exports
let store;
if (__DEV__) {
    store = createStore(reducers, {}, compose(applyMiddleware(thunk, logger)));
} else {
    store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
}

export default store;
