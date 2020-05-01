import { Share } from "react-native";
import { PUSH_DETECTIONS, SET_DETECTIONS, SET_DETECTIONS_LOADING } from "./types";
import { getHostname } from "./util";
import { getToken } from "./accessToken";

export function setDetections(detections) {
    return { type: SET_DETECTIONS, detections };
}

export function pushDetections(detections) {
    return { type: PUSH_DETECTIONS, detections };
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
            if (offset !== 0) {
                dispatch(pushDetections(response));
            } else {
                dispatch(setDetections(response));
            }
            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
            dispatch(setLoading(false));
        }
    };
}

export function shareDetection(detection) {
    return async () => {
        const hostname = await getHostname();
        await Share.share(
            {
                url: `${hostname}${detection.get("capture")}`,
                message: `${hostname}${detection.get("capture")}`,
            },
            {
                dialogTitle: "Share the capture",
            }
        );
    };
}
