import { Card, Paragraph, Switch, Title } from "react-native-paper";
import { View } from "react-native";
import * as React from "react";
import cameraListItem from "../styles/cameraListItem";
import typo from "../styles/typo";

export default function CamerasListItem({ camera, onSwitchChange }) {
    return (
        <Card style={{ marginTop: 10, marginBottom: 10 }}>
            <Card.Content>
                <View style={cameraListItem.container}>
                    <View style={cameraListItem.nameContainer}>
                        <View
                            style={{
                                backgroundColor: camera.get("connected") ? "#00c853" : "#dd2c00",
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
