import { StyleSheet } from "react-native";

export default StyleSheet.create({
    panel: {
        height: 200,
        padding: 20,
        backgroundColor: "#2c2c2c",
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,
    },
    panelHeader: {
        alignItems: "center",
        marginBottom: 16,
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10,
    },
});
