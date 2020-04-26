import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import { getHostname } from "./util";

const TOKEN_KEY = "detector_access_token";
let token = "";

export async function setToken(accessToken) {
    token = accessToken;

    try {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (e) {
        console.log(e);
    }
}

export async function getToken() {
    if (token) {
        return `Bearer ${token}`;
    }

    try {
        token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token !== null) {
            return `Bearer ${token}`;
        }
    } catch (e) {
        console.log(e);
    }

    const { installationId } = Constants;
    const hostname = await getHostname();
    try {
        const responseJson = await fetch(`${hostname}/api/masters/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: installationId,
            }),
        });
        const response = await responseJson.json();
        if (responseJson.status >= 300) {
            return null;
        }
        // eslint-disable-next-line prefer-destructuring
        await setToken(response.token);
        return `Bearer ${token}`;
    } catch (e) {
        console.log(e);
    }

    return null;
}
