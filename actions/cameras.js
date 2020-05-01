import { Share } from "react-native";
import { SET_CAMERAS, SET_CAMERAS_LOADING } from "./types";
import { getHostname } from "./util";
import { getToken } from "./accessToken";

export function setCameras(cameras) {
    return { type: SET_CAMERAS, cameras };
}

export function setLoading(loading) {
    return { type: SET_CAMERAS_LOADING, loading };
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
            dispatch(setCameras(response));
            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
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
