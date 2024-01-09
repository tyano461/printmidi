import { NativeModules } from "react-native";
const { MidiModule } = NativeModules;

interface MidiInterface {
    playNote(tone: number, note: number, callback: CallableFunction): void
    stopNote(tone: number, note: number, callback: CallableFunction): void
    moduleinit(callback: CallableFunction): void
    ShowDrumSelector(channel: number, channellist: string[], callback: CallableFunction): void
    OpenMidi(callback: CallableFunction): void
    SaveMidi(fileName: string, callback: CallableFunction): void
}

export default MidiModule as MidiInterface;