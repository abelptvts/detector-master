import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import moment from "moment";
import cameraListItem from "../styles/cameraListItem";
import typo from "../styles/typo";

export default function DetectionListItem({
    detection,
    hostname,
    onClick,
    onShareClick = () => {},
}) {
    return (
        <TouchableOpacity onPress={() => onClick(detection)}>
            <Card style={{ marginTop: 10, marginBottom: 10 }}>
                <Card.Content>
                    <View style={cameraListItem.container}>
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
                        <Button
                            icon="share-variant"
                            color="white"
                            compact
                            onPress={() => onShareClick(detection)}
                        />
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}
