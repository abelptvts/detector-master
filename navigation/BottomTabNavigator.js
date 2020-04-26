import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import { getToken } from "../actions/accessToken";
import { getHostname } from "../actions/util";
import CamerasScreenContainer from "../containers/CamerasScreenContainer";
import DetectionsScreenContainer from "../containers/DetectionsScreenContainer";


const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    React.useEffect(() => {
        getHostname().then(hostname => {
            if(!hostname) {
                navigation.replace("Configure");
                return;
            }

            getToken().then(token => {
                if(!token) {
                    navigation.replace("Register");
                }
            })
        })
    }, [])

    return (
        <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME} lazy swipeEnabled tabBarPosition="bottom">
            <Tab.Screen
                name="Cameras"
                component={CamerasScreenContainer}
                options={{
                    title: "Cameras",
                }}
            />
            <Tab.Screen
                name="Detections"
                component={DetectionsScreenContainer}
                options={{
                    title: "Detections",
                }}
            />
        </Tab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case "Cameras":
            return "Your Cameras";
        case "Detections":
            return "Your Detections";
    }
}
