import { StyleSheet, Platform } from "react-native";
import * as Typo from "react-native-typography";

export default StyleSheet.create({
    header1: {
        ...Typo.iOSUIKit.title3Emphasized,
        ...Typo.sanFranciscoWeights.black,
        fontWeight: Platform.OS === "android" ? "bold" : undefined,
        marginBottom: 6,
        color: "white",
    },
    caption: Typo.iOSUIKit.caption2,
});
