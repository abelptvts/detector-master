import * as React from "react";
import { Paragraph, withTheme } from "react-native-paper";
import { View, VirtualizedList } from "react-native";
import common from "../styles/common";
import CamerasListItem from "../components/CameraListItem";

function CamerasScreen({ theme, loading, cameras, getCameras }) {
    React.useEffect(() => {
        getCameras();
    }, []);
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <VirtualizedList
                refreshing={loading}
                onRefresh={() => getCameras()}
                data={cameras.toList()}
                getItem={(items, index) => items.get(index)}
                getItemCount={(items) => items.size}
                keyExtractor={(item) => `${item.get("id")}`}
                contentContainerStyle={
                    cameras.size === 0
                        ? common.container
                        : {
                              padding: 12,
                          }
                }
                ListEmptyComponent={() => <Paragraph>You have no connected cameras yet</Paragraph>}
                renderItem={({ item }) => (
                    <CamerasListItem key={item.get("id")} camera={item} onSwitchChange={() => {}} />
                )}
            />
        </View>
    );
}

export default withTheme(CamerasScreen);
