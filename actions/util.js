import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";

const HOSTNAME_KEY = "detector_api_hostname";

let _hostname = null;

export async function getHostname() {
    if (_hostname) {
        return _hostname;
    }
    try {
        _hostname = await AsyncStorage.getItem(HOSTNAME_KEY);
        return _hostname;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export function setHostname(hostname) {
    return async () => {
        try {
            _hostname = hostname;
            await AsyncStorage.setItem(HOSTNAME_KEY, hostname);
        } catch (e) {
            console.log(e);
        }
    };
}

export async function getPermission(permission) {
    const { status: existingStatus } = await Permissions.getAsync(permission);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(permission);
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        throw new Error("permission not granted");
    }
}
