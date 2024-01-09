import { TouchableOpacity, View, Text, StyleSheet, TouchableHighlight } from "react-native"
import { Int32 } from "react-native/Libraries/Types/CodegenTypes"
import MidiModule from "../modules/NativeModuleHelper"

function whitePressIn(wkey: string) {
    console.log("w" + wkey)
    MidiModule.playNote(1, 2, (val: string) => { console.log("received:" + val) });
}
function whitePressOut(wkey: string) {
    console.log("w" + wkey)
    MidiModule.stopNote(1, 2, (val: string) => { console.log("received:" + val) });
}

function blackPress(bkey: string) {
    console.log("b" + bkey)
}

function midiinit(track:number) {
    MidiModule.moduleinit(()=>{});
}

export const Keyboards: React.FC<{track:number}> = ({track}) => {
    const whitekeys = []
    const blackkeys = []

    midiinit(track);
    for (let i = 0; i < 52; i++) {
        whitekeys.push(
            <TouchableOpacity key={"w" + i} style={styles.white}
                onPressIn={() => whitePressIn("" + i)}
                onPressOut={() => whitePressOut("" + i)}
                activeOpacity={0.7} >
            </TouchableOpacity>
        )
    }

    let offset = 20;
    for (let i: Int32 = 0; i < 36; i++) {
        offset += ((i % 5) == 0 || (i % 5) == 3) ? 32 : 0
        const style = {
            ...styles.black,
            top: i * 32 + offset
        }
        blackkeys.push(
            <TouchableOpacity key={"b" + i} style={style} onPress={() => blackPress("" + i)}
                activeOpacity={0.7} />
        )
    }

    return (
        <View>
            {whitekeys}
            {blackkeys}
        </View>
    )
}

const styles = StyleSheet.create({
    black: {
        position: 'absolute',
        zIndex: 100,
        height: 20,
        width: 40,
        top: 0,
        backgroundColor: '#000000'
    },
    white: {
        width: 70,
        height: 32,
        borderWidth: 1,
        opacity: 0.3,
        backgroundColor: '#ffd700 '
    },
})