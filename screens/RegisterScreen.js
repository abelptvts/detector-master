import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Card, Paragraph, TextInput, Title, withTheme } from "react-native-paper";
import * as Permissions from "expo-permissions";
import commonStyles from "../styles/common";
import typo from "../styles/typo";
import { getPermission } from "../actions/util";

function RegisterScreen({ theme, register }) {
    const [name, setName] = React.useState("");
    const [hasNotificationPermission, setHasNotificationPermission] = React.useState(false);

    React.useEffect(() => {
        getPermission(Permissions.NOTIFICATIONS)
            .then(() => setHasNotificationPermission(true))
            .catch(() => setHasNotificationPermission(false));
    }, []);

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
                        <Title style={typo.header1}>Your name</Title>
                        <Paragraph>Please enter your name</Paragraph>
                        <TextInput
                            value={name}
                            onChangeText={(value) => setName(value)}
                            theme={theme}
                            label="Your name"
                            placeholder="John Doe"
                            mode="outlined"
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            icon="check"
                            theme={theme}
                            disabled={name.length === 0 || !hasNotificationPermission}
                            onPress={() => register(name)}
                        >
                            Register
                        </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default withTheme(RegisterScreen);
