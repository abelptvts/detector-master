import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { View } from "react-native";
import * as React from "react";
import cameraListItem from "../styles/cameraListItem";
import typo from "../styles/typo";

export default function CamerasListItem({ camera, onSwitchChange }) {
    return (
        <Card>
            <Card.Content>
                <View style={cameraListItem.container}>
                    <View style={cameraListItem.nameContainer}>
                        <View
                            style={{
                                backgroundColor: camera.get("connected") ? "green" : "red",
                                ...cameraListItem.indicator,
                            }}
                        />
                        <View>
                            <Title style={typo.header1}>{camera.get("name")}</Title>
                            <Paragraph>camera #{camera.get("id")}</Paragraph>
                        </View>
                    </View>
                    <Switch
                        disabled={!camera.get("connected")}
                        value={camera.get("enabled")}
                        onValueChange={() => onSwitchChange()}
                    />
                </View>
            </Card.Content>
        </Card>
    );
}
