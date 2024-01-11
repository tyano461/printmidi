import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParams } from "../App"
import { EditMode, TrackDataProperties } from "../components/NoteFrame"

export interface KeyboardProperties {
    edit?: EditMode
    play?: string
    measure?: number
    track?: number
    resolution?: number
}

export default class Midi {
    navigation: NativeStackScreenProps<RootStackParams, 'KBD'>
    trackinfo: TrackDataProperties

    constructor(props: TrackDataProperties, navigation: NativeStackScreenProps<RootStackParams, 'KBD'>) {
        this.navigation = navigation
        this.trackinfo = props
    }

    handleInstrument(props: KeyboardProperties) {
        if (props.play && props.play.length > 0) {
            if (props.play === "play") {

            }
        } else if (props.edit) {

        } else if (props.measure) {
            this.trackinfo.measure = props.measure
            this.navigation.navigation.navigate('KBD')
        } else if (props.resolution) {
            console.log("resolution")
        } else if (props.track) {
            this.trackinfo.trackno = props.track
        }
    }
}
