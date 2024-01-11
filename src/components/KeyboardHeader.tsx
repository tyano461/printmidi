import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ImageButton } from "./ImageButton";
import MidiModule from "../modules/NativeModuleHelper";
import { resetNavigate } from "../modules/misc";
import { PlayMode } from "../modules/Definitions";
import { EditMode, TrackDataProperties } from "./NoteFrame";
import { KeyboardProperties } from "../modules/Midi";

enum UndoRedo {
    Never = 0,
    UndoAble = 1,
    RedoAble = 2,
    Both = 3,
}


export const KeyboardHeader: React.FC<{
    handler: CallableFunction
    , track?: TrackDataProperties
    , options?: any
}> = ({ handler, track, options }) => {
    let loading = false

    console.log("track:" + track)
    let base_props = track ? track : {
        trackno: 0,
        measure: 0,
        max_measure: 1,
        resolution: 1,
        channel: 0,
        editmode: EditMode.Write
    }

    const navigation = options?.navigation
    const [play, setPlayIcon] = useState(PlayMode.Play)
    const [undoredo, setUndoRedo] = useState(UndoRedo.Never)
    const [props, setProps] = useState(base_props)

    let udstyle = {
        ...styles.icon,
        disable: undoredo == UndoRedo.UndoAble || undoredo == UndoRedo.Both
    }

    let rdstyle = {
        ...styles.icon,
        disable: undoredo == UndoRedo.RedoAble || undoredo == UndoRedo.Both
    }

    const measurelist: string[] = [];
    for (let i = 0; i < props.max_measure; i++) {
        measurelist.push("" + (i + 1))
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
                    console.log("w ed:" + props.editmode);
                    if (props.editmode != EditMode.Write) {
                        setProps({ ...props, editmode: EditMode.Write });
                        handler({ edit: EditMode.Write });
                    }
                }}
            />
            <ImageButton title="erase" source="erase" style={styles.icon} imstyle={styles.image}
                onPress={() => {
                    console.log("e ed:" + props.editmode);
                    if (props.editmode != EditMode.Erase) {
                        setProps({ ...props, editmode: EditMode.Erase });
                        handler({ edit: EditMode.Erase });
                    }
                }}
            />
            <ImageButton title="play" source={play} style={styles.icon} imstyle={styles.image}
                onPress={() => {
                    handler({ play: play })
                    if (play === PlayMode.Stop) {
                        setPlayIcon(PlayMode.Play)
                    } else {
                        setPlayIcon(PlayMode.Stop)
                    }
                }}
            />
            <Button title={"T:" + track?.trackno} onPress={() => {
                navigation?.navigate('Track')
            }} />
            <Button title={"♪=" + props.resolution} onPress={() => {
                MidiModule.ShowDrumSelector(props.resolution, ["1", "2", "4"], (r: number) => {
                    if (props.resolution != r) {
                        setProps({ ...props, resolution: r })
                        handler({})
                    }
                })
            }} />
            <Button title="<" onPress={() => {
                if (props.measure > 0) setProps({ ...props, measure: props.measure - 1 })
                handler()
            }} />
            <Button title={"" + props.measure} onPress={() => {
                MidiModule.ShowDrumSelector(props.measure, measurelist, (m: number) => {
                    if (props.measure != m) {
                        setProps({ ...props, measure: m })
                        handler()
                    }
                })
            }} />
            <Button title=">" onPress={() => {
                setProps({ ...props, measure: props.measure + 1 })
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