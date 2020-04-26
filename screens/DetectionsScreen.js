import * as React from "react";
import { Card, Paragraph, Title, withTheme } from "react-native-paper";
import { TouchableOpacity, View, VirtualizedList, Image, Modal } from "react-native";
import moment from "moment";
import ImageViewer from "react-native-image-zoom-viewer";
import common from "../styles/common";
import cameraListItem from "../styles/cameraListItem";
import typo from "../styles/typo";
import { getHostname } from "../actions/util";

function DetectionListItem({ detection, hostname, onClick }) {
    return (
        <TouchableOpacity onPress={() => onClick(detection)}>
            <Card style={{ marginTop: 10, marginBottom: 10 }}>
                <Card.Content>
                    <View style={cameraListItem.nameContainer}>
                        <Image
                            style={{ width: 66, height: 66, marginRight: 12, borderRadius: 6 }}
                            source={{ uri: `${hostname}${detection.get("capture")}` }}
                        />
                        <View>
                            <Title style={typo.header1}>Camera name</Title>
                            <Paragraph>{moment(detection.get("date")).fromNow()}</Paragraph>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

function DetectionsScreen({ theme, loading, detections, getDetections }) {
    const [hostname, setHostname] = React.useState("");
    const [modalOpen, setModalOpen] = React.useState(false);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        getDetections();
        // we should have the hostname cached by now
        getHostname().then((h) => setHostname(h));
    }, []);

    const onDetectionClick = React.useCallback(
        (detection) => {
            setImages([{ url: `${hostname}${detection.get("capture")}` }]);
            setModalOpen(true);
        },
        [hostname]
    );

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.surface }}>
            <Modal
                animationType="slide"
                visible={modalOpen}
                style={{ flex: 1 }}
                transparent={false}
                onRequestClose={() => setModalOpen(false)}
            >
                <ImageViewer
                    imageUrls={images}
                    renderIndicator={() => null}
                    enableSwipeDown
                    onCancel={() => setModalOpen(false)}
                />
            </Modal>
            <VirtualizedList
                refreshing={loading}
                onRefresh={() => getDetections()}
                data={detections}
                getItem={(items, index) => items.get(index)}
                getItemCount={(items) => items.size}
                keyExtractor={(item) => `${item.get("id")}`}
                contentContainerStyle={
                    detections.size === 0
                        ? common.container
                        : {
                              padding: 12,
                          }
                }
                ListEmptyComponent={() => (
                    <Paragraph>Your cameras haven&apos;t detected anything yet</Paragraph>
                )}
                renderItem={({ item }) => (
                    <DetectionListItem
                        detection={item}
                        hostname={hostname}
                        onClick={onDetectionClick}
                    />
                )}
            />
        </View>
    );
}

export default withTheme(DetectionsScreen);
