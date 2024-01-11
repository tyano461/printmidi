import { View, TouchableOpacity, StyleSheet, GestureResponderEvent, Dimensions } from "react-native"
import { isBlackKey } from "../modules/misc"
import { useRef } from "react"
import { DefaultTransition } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets"

export enum EditMode {
    Write = 1,
    Erase = 2
}

type ViewPos = {
    lx: number
    ly: number
    w: number
    h: number
    px: number
    py: number
}

export interface TrackDataProperties {
    trackno: number
    measure: number
    max_measure: number
    resolution: number
    channel: number
    editmode: EditMode
}

function roundedX(x: number, w: number, resolution: number) {
    const div = resolution * 8

    // console.log("rounded " + x + "/" + w + " r:" + resolution)
    if (div != 0) {
        const part = w / div
        if (x >= (part / 2)) {
            for (let i = div; i > 0; i--) {
                if (x > (i * part) - (part / 2)) {
                    return i
                }
            }
        }
    }
    return 0;
}

let pressed = {
    key: "",
    pos: 0
}

function frameIn(pos: ViewPos, e: GestureResponderEvent, key: string, resolution: number) {
    const { width, height } = Dimensions.get('screen')
    //    console.log("frame in:" + key + " " + (e.nativeEvent.locationX * (width / pos.w))
    //        + " x:" + e.nativeEvent.locationX + " px:" + e.nativeEvent.pageX + " w:" + width + " o:" + pos.w + " lx:" + pos.lx)
    // console.log("frame in:" + key + " " + roundedX(e.nativeEvent.pageX - pos.lx, width - pos.lx, resolution))
    pressed.key = key
    pressed.pos = roundedX(e.nativeEvent.pageX - pos.lx, width - pos.lx, resolution)
}

function frameOut(pos: ViewPos, e: GestureResponderEvent, key: string, resolution: number) {
    const { width, height } = Dimensions.get('screen')
    console.log("frame out:" + key + " " + roundedX(e.nativeEvent.pageX - pos.lx, pos.w, resolution))
}

export const NoteFrame: React.FC<{ trackdata: TrackDataProperties }> = ({ trackdata }) => {
    const frames = []

    const ref = useRef<View>(null)


    const getPos = (callback: CallableFunction) => {
        if (ref.current) {
            ref.current.measure((x, y, width, height, pageX, pageY) => {
                callback({ lx: x, ly: y, w: width, h: height, px: pageX, py: pageY })
            })
        } else {
            console.log("getPos failed")
            callback(null)
        }
    }

    for (let i = 0; i < 88; i++) {
        const style = {
            ...styles.frame,
            backgroundColor: isBlackKey(i) ? "#F0F0F0" : "#FFFFFF"
        }
        frames.push(
            <View key={"w" + i} >
                <TouchableOpacity style={style}
                    onPressIn={(e) => {
                        getPos((coord: ViewPos | undefined) => coord && frameIn(coord, e, "" + i, trackdata.resolution))
                    }}
                    onPressOut={(e) => {
                        getPos((coord: ViewPos | undefined) => coord && frameOut(coord, e, "" + i, trackdata.resolution))
                    }}
                    delayPressOut={10}
                />
            </View>
        )
    }
    return (
        <View style={styles.frames} ref={ref}>
            {frames}
        </View>
    )
}

const styles = StyleSheet.create({
    frame: {
        width: 10000,
        height: 18.68,
        borderWidth: 0.5,
        backgroundColor: "#FFFFFF"
    },
    frames: {
        width: "100%",
        height: 1760,
        paddingTop: 13
    }
})