import * as React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Button, Card, Paragraph, TextInput, Title, withTheme } from "react-native-paper";
import typo from "../styles/typo";
import commonStyles from "../styles/common";

function AddCameraScreen({ theme, registerCamera }) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={[
                commonStyles.container,
                { alignItems: undefined, backgroundColor: theme.colors.surface },
            ]}
        >
            <ScrollView>
                <Card>
                    <Card.Content>
                        <Title style={typo.header1}>Add a new Camera</Title>
                        <Paragraph>
                            After filling out the following form you will receive an access token
                            for your newly added Camera.
                        </Paragraph>
                        <TextInput
                            value={name}
                            onChangeText={(value) => setName(value)}
                            theme={theme}
                            label="Camera name"
                            placeholder="Living room #1"
                            mode="outlined"
                            style={{ marginBottom: 16 }}
                        />
                        <TextInput
                            value={description}
                            onChangeText={(value) => setDescription(value)}
                            theme={theme}
                            label="Description"
                            placeholder="Top-left corner by the window"
                            mode="outlined"
                            multiline
                            numberOfLines={5}
                        />
                    </Card.Content>
                </Card>
                <Card.Actions>
                    <Button
                        icon="check"
                        theme={theme}
                        disabled={name.length === 0}
                        onPress={() => registerCamera(name, description)}
                    >
                        Add camera
                    </Button>
                </Card.Actions>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default withTheme(AddCameraScreen);
