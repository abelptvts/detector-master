import React from "react";
import { View } from "react-native";
import { withTheme } from "react-native-paper";

function Container({ theme }) {
    return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;
}

export default withTheme(Container);
