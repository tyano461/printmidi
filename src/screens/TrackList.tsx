import React, { useState } from "react";
import { Button, TouchableOpacity, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParams } from "../App";
import Internal from "../modules/InternalData";
import { ToneNameList } from "../modules/Definitions";
import MidiModule from "../modules/NativeModuleHelper";

interface ToneType {
    label : string
    value : string
}

function savetrack(data: any) {
    Internal.save('trackdata', JSON.stringify(data))
}


export const TrackList: React.FC<
    NativeStackScreenProps<RootStackParams, 'Track'>
> = ({ navigation }) => {
    const str = Internal.load('trackdata')
    const window = useWindowDimensions()

    let trackdata: { channel: number; }[] = []

    if (str.length == 0) {
        for (let i = 0; i < 16; i++) {
            trackdata.push({ channel: 1 })
        }
    } else {
        trackdata = JSON.parse(str)
    }

    const trackview = []
    const tonelist : ToneType[] = []
    for (let i = 1; i <= 128; i++) {
        tonelist.push(
            { label: ToneNameList[i - 1], value: "" + i }
        )
    }

    const [tracks, setTracks] = useState(trackdata)

    for (let i = 0; i < trackdata.length; i++) {
        trackview.push(
            <View style={styles.track} key={"t" + i}>
                <Text style={styles.prefix}>{"T" + i}:</Text>
                <TouchableOpacity key={"t" + i} style={styles.channel_input} onPress={(e) => {
                    MidiModule.ShowDrumSelector(tracks[i].channel, tonelist.map((t)=>t.label) , (channel:number)=> {
                        if (tracks[i].channel != channel) {
                            trackdata[i].channel = channel
                            setTracks(trackdata)
                        }
                    })
                }} >
                    <Text>{tracks[i].channel}{"("}{tonelist[tracks[i].channel - 1].label}{")"}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View>
            <Button title="Save" onPress={() => { savetrack(trackdata) }} />
            {trackview}
        </View>
    )
}

const styles = StyleSheet.create({
    track: {
        flexDirection: 'row'
    },
    prefix: {
        width: 30,
        height: 24,
        margin: 2
    },
    channel_input: {
        height: 24,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#888888",
        borderRadius: 2,
    },

})