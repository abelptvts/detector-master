import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Button, Card, Paragraph, TextInput, Title, withTheme } from "react-native-paper";
import commonStyles from "../styles/common";
import typo from "../styles/typo";

function ConfigScreen({ theme, saveHostname }) {
    const [hostname, setHostname] = useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[
                commonStyles.container,
                { alignItems: undefined, backgroundColor: theme.colors.surface },
            ]}
        >
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title style={typo.header1}>Hostname</Title>
                        <Paragraph>You have to configure the hostname of the API</Paragraph>
                        <TextInput
                            value={hostname}
                            onChangeText={(value) => setHostname(value)}
                            theme={theme}
                            label="Hostname"
                            placeholder="https://example.com"
                            mode="outlined"
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            icon="check"
                            theme={theme}
                            disabled={hostname.length === 0}
                            onPress={() => saveHostname(hostname)}
                        >
                            Save
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default withTheme(ConfigScreen);
