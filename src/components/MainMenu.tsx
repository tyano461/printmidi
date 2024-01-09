import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { RootStackParams } from "../App";
import MidiModule from "../modules/NativeModuleHelper";
import numbersIndex from "react-native-mmkv-storage/dist/src/indexer/numbers";


export const MainMenu: React.FC<{ option: any }> = ({ option }) => {
    const navigation: StackNavigationProp<RootStackParams> = option;
    return (
        <View>
            <Button title="New MIDI" onPress={() => {
                navigation.navigate('KBD')
            }} />
            <Button title="Edit MIDI" onPress={() => {
                MidiModule.OpenMidi((result: string, trackdata_json: string, err: string) => {
                    const r = parseInt(result)
                    console.log(result, trackdata_json, err)
                    if (r < 0) {
                        // console.log(result, trackdata_json, err )
                    } else {
                        // const trackdata = JSON.parse(trackdata_json)
                        // navigation.navigate('KBD', { trackdata })
                    }

                })
            }} />
            <Button title="Export MIDI" onPress={() => { }} />
            <Button disabled title="Recording" onPress={() => { }} />
            <Button disabled title="Show Score" onPress={() => { }} />
            <Button disabled title="Output PDF" onPress={() => { }} />
        </View>
    );
}