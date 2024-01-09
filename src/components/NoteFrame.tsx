import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { isBlackKey } from "../modules/misc"

function frameIn(key: string) {
    console.log("frame in:" + key)
}

function frameOut(key: string) {
    console.log("frame out:" + key)
}

export const NoteFrame: React.FC<{headerOffset?:number}> = ({headerOffset:headerOffset}) => {
    const frames = []

    for (let i = 0; i < 88; i++) {
        const style = {
            ...styles.frame,
            backgroundColor: isBlackKey(i) ? "#F0F0F0" : "#FFFFFF"
        }
        frames.push(
            <View key={"w" + i} >
                <TouchableOpacity style={style}
                    onPressIn={() => frameIn("" + i)}
                    onPressOut={() => frameOut("" + i)}
                />
            </View>
        )
    }
    return (
        <ScrollView style={styles.frames}>
            {frames}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    frame: {
        width: 100000,
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