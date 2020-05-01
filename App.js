import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Provider as ReduxProvider } from "react-redux";
import { Provider as ThemeProvider } from "react-native-paper";
import useLinking from "./navigation/useLinking";
import store from "./reducers/store";
import AppNavigator from "./navigation/AppNavigator";
import { theme } from "./styles/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function App({ skipLoadingScreen }) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !skipLoadingScreen) {
        return null;
    }
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
                    <StatusBar barStyle="light-content" />
                    <AppNavigator
                        containerRef={containerRef}
                        initialState={initialNavigationState}
                    />
                </View>
            </ThemeProvider>
        </ReduxProvider>
    );
}
