import { DarkTheme } from "react-native-paper";

export const theme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: "#ffc107",
        accent: "#ffc107",
    },
};
