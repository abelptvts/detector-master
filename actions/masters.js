import { Notifications } from "expo";
import Constants from "expo-constants";
import { getHostname } from "./util";
import { setToken } from "./accessToken";

export function register(name) {
    return async () => {
        try {
            const hostname = await getHostname();
            const { installationId } = Constants;
            const expoPushToken = await Notifications.getExpoPushTokenAsync();
            const responseJson = await fetch(`${hostname}/api/masters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ installationId, name, expoPushToken }),
            });
            const response = await responseJson.json();
            await setToken(response.token);
        } catch (e) {
            console.log(e);
        }
    };
}
