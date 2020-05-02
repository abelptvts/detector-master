import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";
import { View, ActivityIndicator } from "react-native";

import { withTheme } from "react-native-paper";
import { getToken } from "../actions/accessToken";
import { getHostname } from "../actions/util";
import CamerasScreenContainer from "../containers/CamerasScreenContainer";
import DetectionsScreenContainer from "../containers/DetectionsScreenContainer";
import common from "../styles/common";

const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

function BottomTabNavigator({ theme, navigation, route }) {
    const [loaded, setLoaded] = React.useState(false);
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    React.useEffect(() => {
        getHostname().then((hostname) => {
            if (!hostname) {
                navigation.replace("Configure");
                return;
            }

            getToken().then((token) => {
                if (!token) {
                    navigation.replace("Register");
                    return;
                }
                setLoaded(true);
            });
        });
    }, []);

    if (!loaded) {
        return (
            <View style={common.container}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <Tab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            lazy
            swipeEnabled
            tabBarPosition="bottom"
        >
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

export default withTheme(BottomTabNavigator);

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case "Cameras":
            return "Your Cameras";
        case "Detections":
            return "Your Detections";
    }
}
