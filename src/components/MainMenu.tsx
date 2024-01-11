import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "react-native-elements";
import { RootStackParams } from "../App";
import MidiModule from "../modules/NativeModuleHelper";
import { ImageButton } from "./ImageButton";


export const MainMenu: React.FC<{ option: any }> = ({ option }) => {
    const navigation: StackNavigationProp<RootStackParams> = option;
    return (
        <View style={styles.wrapper}>
            <Button title="New MIDI" style={styles.without_icon} onPress={() => {
                navigation.navigate('KBD')
            }} />
            <Button title="Edit MIDI" style={styles.without_icon}  onPress={() => {
                MidiModule.OpenMidi((status: string, data: string) => {
                    const r = parseInt(status)
                    console.log(status, data)
                    if (r < 0) {
                        // console.log(result, trackdata_json, err )
                    } else {
                        // const trackdata = JSON.parse(trackdata_json)
                        // navigation.navigate('KBD', { trackdata })
                    }
                })
            }} />
            <View style={styles.with_warning}>
                <ImageButton source="warning" style={styles.icon} imstyle={styles.icon} onPress={showExportWarning} />
                <Button title="Export MIDI" style={styles.with_icon} buttonStyle={{backgroundColor:"#123456"}} onPress={() => { }} />
            </View>
            <Button disabled title="Recording" style={styles.without_icon}  onPress={() => { }} />
            <Button disabled title="Show Score" style={styles.without_icon}  onPress={() => { }} />
            <Button disabled title="Output PDF" style={styles.without_icon}  onPress={() => { }} />
            <Button title="LICENSE" style={styles.without_icon}  onPress={() => { navigation.navigate('License') }} />
        </View>
    );
}

const showExportWarning = () => {
    MidiModule.ShowAlert('WARNING !!!', `
Your MIDI data may be missing some information!!!

Please do not overwrite data created outside of this app.

The data handled by this app is the minimum information needed to produce sound.

If you edit the original data and overwrite it,
The following information will be lost.

- Controle Change(pedal, wheel, lever, etc...)
- Pitch bend (quarter tone, vibrato, etc...)
- Aftertouch (pressure change)
- Meta information (author, lyrics, etc.)
- SysEx (events defined by the manufacturer, etc.)
- Track data other than "Mtrk" (chunk data defined by the manufacturer)

Also, the following information will be reconstructed by this app

- Note ON/OFF
- Program change (information that cannot be handled by this app, such as presets and patches, will be discarded)
    `, [
        'OK',
    ], "left", () => { }
    )
}

const styles = StyleSheet.create({
    wrapper: {
        paddingRight: 40
    },
    with_warning: {
        flexDirection: 'row',
        width: 200
    },
    icon: {
        width: 40,
        height: 40
    },
    with_icon:{ 
        width: 200,
        backgroundColor: "#123456"
    },
    without_icon:{ 
        marginLeft: 40,
        width: 200
    }
})