import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ImageButton } from "./ImageButton";
import MidiModule from "../modules/NativeModuleHelper";
import { Animated } from "react-native";
import { resetNavigate } from "../modules/misc";
import { PlayMode } from "../modules/Definitions";

enum EditMode {
    Write = 0,
    Erase = 1

}

enum UndoRedo {
    Never = 0,
    UndoAble = 1,
    RedoAble = 2,
    Both = 3,
}


export const KeyboardHeader: React.FC<{
    handler: CallableFunction
    , track: number
    , options?: any
}> = ({ handler, track, options }) => {
    let loading = false

    const navigation = options?.navigation
    const [play, setPlay] = useState(PlayMode.Stop)
    const [measure, setMeasure] = useState(1)
    const [resolution, setResolution] = useState(1)
    const [editmode, setEditMode] = useState(EditMode.Write)
    const [undoredo, setUndoRedo] = useState(UndoRedo.Never)

    let udstyle = {
        ...styles.icon,
        disable: undoredo == UndoRedo.UndoAble || undoredo == UndoRedo.Both
    }

    let rdstyle = {
        ...styles.icon,
        disable: undoredo == UndoRedo.RedoAble || undoredo == UndoRedo.Both
    }

    // return to menu
    // open
    // save
    // select mode

    const mstyle = {
        ...styles.icon,
        width: 20
    }
    const immstyle = {
        ...styles.icon,
        height: 24,
        width: 15
    }

    return (
        <View style={styles.header}>
            {/* <ImageButton title="undo" source="undo" style={udstyle} imstyle={styles.image}
                onPress={() => {
                    console.log("undo");
                }}
            />
            <ImageButton title="redo" source="redo" style={rdstyle} imstyle={styles.image}
                onPress={() => {
                    console.log("redo");
                }}
            /> */}


            <ImageButton title="main" source="main" style={mstyle} imstyle={immstyle}
                onPress={() => {
                    resetNavigate(navigation, 'Main');
                }}
            />
            <ImageButton title="write" source="write" style={styles.icon} imstyle={styles.image}
                onPress={() => {
                    console.log("w ed:" + editmode);
                    if (editmode != EditMode.Write) {
                        setEditMode(EditMode.Write);
                        handler();
                    }
                }}
            />
            <ImageButton title="erase" source="erase" style={styles.icon} imstyle={styles.image}
                onPress={() => {
                    console.log("e ed:" + editmode);
                    if (editmode != EditMode.Erase) {
                        setEditMode(EditMode.Erase);
                    }
                }}
            />
            <ImageButton title="play" source={play} style={styles.icon} imstyle={styles.image}
                onPress={() => {
                    handler({ play: play })
                    if (play === PlayMode.Stop) {
                        setPlay(PlayMode.Play)
                    } else {
                        setPlay(PlayMode.Stop)
                    }
                }}
            />
            <Button title={"T:" + track} onPress={() => {
                navigation?.navigate('Track')
            }} />
            <Button title={"♪=" + resolution} onPress={() => {
                MidiModule.ShowDrumSelector(resolution, [], (r: number) => {
                    if (resolution != r) {
                        setResolution(r)
                    }
                })
            }} />
            <Button title="<" onPress={() => {
                if (measure > 0) setMeasure(measure - 1)
                handler()
            }} />
            <Button title={"" + measure} onPress={() => {
                MidiModule.ShowDrumSelector(measure, [], (m: number) => {
                    if (measure != m) {
                        setMeasure(m)
                        handler()
                    }
                })
            }} />
            <Button title=">" onPress={() => {
                setMeasure(measure + 1)
                handler()
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        paddingBottom: 0,
        marginBottom: 0
    },
    icon: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 30,
        height: 30,
    }
});