import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

export const MainMenu: React.FC = () => {
    return (
        <View>
            <Button title="Edit MIDI" onPress={() => { }} />
            <Button title="New MIDI" onPress={() => { }} />
        </View>
    );
}