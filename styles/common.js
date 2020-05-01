import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
    },
    input: {
        height: 50,
        padding: 6,
        fontSize: 18,
        alignSelf: "stretch",
        marginBottom: 6,
    },
    fab: { position: "absolute", margin: 16, right: 0, bottom: 0, zIndex: 1001 },
});
