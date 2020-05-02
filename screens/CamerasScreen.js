import * as React from "react";
import { Button, FAB, Paragraph, Title, withTheme } from "react-native-paper";
import { View, VirtualizedList, Alert } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import common from "../styles/common";
import CamerasListItem from "../components/CameraListItem";
import settingsSheet from "../styles/settingsSheet";
import typo from "../styles/typo";

function SettingsSheet({ navigation }) {
    return (
        <View style={[settingsSheet.panel, { zIndex: 1000 }]}>
            <View style={settingsSheet.panelHeader}>
                <View style={settingsSheet.panelHandle} />
                <Title style={typo.header1}>Settings</Title>
            </View>
            <Button
                mode="contained"
                style={{ borderRadius: 20 }}
                onPress={() => {
                    navigation.push("Configure");
                }}
            >
                Configure hostname
            </Button>
        </View>
    );
}

function CamerasScreen({
    theme,
    loading,
    cameras,
    getCameras,
    toggleCamera,
    deleteCamera,
    navigation,
}) {
    const bottomSheetRef = React.useRef(null);
    const [page, setPage] = React.useState(0);

    React.useEffect(() => {
        getCameras(page * 10, 10);
    }, [page]);

    const confirmDeleteCamera = React.useCallback((camera) => {
        Alert.alert(
            `Are you sure you want to delete ${camera.get("name")}?`,
            "Once deleted the detections will be lost too.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress() {
                        deleteCamera(camera.get("id"));
                    },
                },
            ]
        );
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <VirtualizedList
                refreshing={loading}
                onRefresh={() => getCameras()}
                data={cameras}
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
                    <CamerasListItem
                        key={item.get("id")}
                        camera={item}
                        onLongPress={confirmDeleteCamera}
                        onSwitchChange={() => toggleCamera(item.get("id"), !item.get("enabled"))}
                    />
                )}
                onEndReached={() => setPage((prev) => prev + 1)}
            />
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[200, 40]}
                renderContent={() => SettingsSheet({ navigation })}
                initialSnap={1}
            />
            <FAB style={common.fab} icon="plus" onPress={() => navigation.push("Add Camera")} />
        </View>
    );
}

export default withTheme(CamerasScreen);
