import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { Provider as ReduxProvider } from "react-redux";
import { Provider as ThemeProvider } from "react-native-paper";
import * as Sentry from "sentry-expo";
import useLinking from "./navigation/useLinking";
import store from "./reducers/store";
import AppNavigator from "./navigation/AppNavigator";
import { theme } from "./styles/theme";

Sentry.init({
    dsn: "https://e5b379be19c54b53867dcddbace72344@o386532.ingest.sentry.io/5220950",
    enableInExpoDevelopment: true,
    debug: true,
});
Sentry.setRelease(Constants.manifest.revisionId);

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
