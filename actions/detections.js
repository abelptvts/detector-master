import { SET_DETECTIONS, SET_DETECTIONS_LOADING } from "./types";
import { getHostname } from "./util";
import { getToken } from "./accessToken";

export function setDetections(detections) {
    return { type: SET_DETECTIONS, detections };
}

export function setLoading(loading) {
    return { type: SET_DETECTIONS_LOADING, loading };
}

export function getDetections(offset = 0, limit = 10) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const hostname = await getHostname();
            const responseJson = await fetch(
                `${hostname}/api/detections?offset=${offset}&limit=${limit}`,
                {
                    headers: {
                        Authorization: await getToken(),
                    },
                }
            );
            const response = await responseJson.json();
            dispatch(setDetections(response));
            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
            dispatch(setLoading(false));
        }
    };
}
