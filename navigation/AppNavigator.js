import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { withTheme } from "react-native-paper";
import ConfigScreenContainer from "../containers/ConfigScreenContainer";
import BottomTabNavigator from "./BottomTabNavigator";
import RegisterScreenContainer from "../containers/RegisterScreenContainer";
import AddCameraScreenContainer from "../containers/AddCameraScreenContainer";

const Stack = createStackNavigator();

function AppNavigator({ containerRef, initialState, theme }) {
    return (
        <NavigationContainer ref={containerRef} initialState={initialState} theme={theme}>
            <Stack.Navigator>
                <Stack.Screen name="Your Cameras" component={BottomTabNavigator} />
                <Stack.Screen name="Configure" component={ConfigScreenContainer} />
                <Stack.Screen name="Register" component={RegisterScreenContainer} />
                <Stack.Screen name="Add Camera" component={AddCameraScreenContainer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default withTheme(AppNavigator);
