import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { withTheme } from "react-native-paper";
import ConfigScreenContainer from "../containers/ConfigScreenContainer";
import BottomTabNavigator from "./BottomTabNavigator";
import RegisterScreenContainer from "../containers/RegisterScreenContainer";

const Stack = createStackNavigator();

function AppNavigator({ containerRef, initialState, theme }) {
    return (
        <NavigationContainer
            ref={containerRef}
            initialState={initialState}
            theme={
                Platform.OS === "ios"
                    ? {
                          ...DarkTheme,
                          colors: { ...DarkTheme.colors, primary: "white" },
                      }
                    : { colors: { background: theme.colors.primary } }
            }
        >
            <Stack.Navigator>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
                <Stack.Screen name="Configure" component={ConfigScreenContainer} />
                <Stack.Screen name="Register" component={RegisterScreenContainer} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default withTheme(AppNavigator);
