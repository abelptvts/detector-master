import { Share, Alert } from "react-native";
import { PUSH_CAMERAS, SET_CAMERAS, SET_CAMERAS_LOADING, UPDATE_CAMERA } from "./types";
import { getHostname } from "./util";
import { getToken } from "./accessToken";

export function setCameras(cameras) {
    return { type: SET_CAMERAS, cameras };
}

export function pushCameras(cameras) {
    return { type: PUSH_CAMERAS, cameras };
}

export function setLoading(loading) {
    return { type: SET_CAMERAS_LOADING, loading };
}

export function updateCamera(id, enabled) {
    return { type: UPDATE_CAMERA, id, enabled };
}

export function getCameras(offset = 0, limit = 10) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const hostname = await getHostname();
            const responseJson = await fetch(
                `${hostname}/api/cameras?offset=${offset}&limit=${limit}`,
                {
                    headers: {
                        Authorization: await getToken(),
                    },
                }
            );
            const response = await responseJson.json();
            if (offset === 0) {
                dispatch(setCameras(response));
            } else {
                dispatch(pushCameras(response));
            }
            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
            Alert.alert("Error!", "Could not connect to API.");
            dispatch(setLoading(false));
        }
    };
}

export function registerCamera(name, description) {
    return async () => {
        try {
            const hostname = await getHostname();
            const responseJson = await fetch(`${hostname}/api/cameras`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: await getToken(),
                },
                body: JSON.stringify({ name, description }),
            });
            const response = await responseJson.json();
            await Share.share(
                { message: response.token, title: `Camera ${name} - Access Token` },
                {
                    dialogTitle: "Send the access token to yourself!",
                }
            );
        } catch (e) {
            console.log(e);
        }
    };
}

export function toggleCamera(id, enabled) {
    return async (dispatch) => {
        try {
            dispatch(updateCamera(id, enabled));
            const hostname = await getHostname();
            const responseJson = await fetch(`${hostname}/api/cameras/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: await getToken(),
                },
                body: JSON.stringify({ enabled }),
            });
            const response = await responseJson.json();
            if (!response.id) {
                Alert.alert("Error!", "Could not toggle camera.");
            }
        } catch (e) {
            Alert.alert("Error!", "Could not connect to API.");
            console.log(e);
        }
    };
}
