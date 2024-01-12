import React from "react";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { PlayMode } from "../modules/Definitions";

const ASSETS = "../../assets/"

export const ICON_KEY = {
    TO_MAIN: "main",
    NOTE_WRITE_MODE: "write",
    NOTE_ERASE_MODE: "erase",
    WARNING: "warning",
}

const icons = [
    { key: ICON_KEY.TO_MAIN, val: require(ASSETS + "back.png") },
    { key: ICON_KEY.NOTE_WRITE_MODE, val: require(ASSETS + "pencil.png") },
    { key: ICON_KEY.NOTE_ERASE_MODE, val: require(ASSETS + "eraser.png") },
    { key: PlayMode.Play, val: require(ASSETS + "play.png") },
    { key: PlayMode.Stop, val: require(ASSETS + "stop.png") },
    // main menu
    { key: ICON_KEY.WARNING, val: require(ASSETS + "warning2.png") },
]



export interface ImageButtonProps extends TouchableOpacityProps {
    title?: string
    source?: string
    imstyle?: object
}
export class ImageButton extends React.Component<ImageButtonProps>  {
    constructor(props: ImageButtonProps) {
        super(props);
    }


    render() {
        const p: ImageButtonProps = this.props
        const src = [...(icons.filter((d) => d.key === p.source).map((d) => d.val))][0]
        // console.log("source:" + src + " st:" + p.style + " im:" + p.imstyle)
        const func: CallableFunction | undefined = p.onPress

        return (
            <TouchableOpacity style={p.style} onPress={() => { if (func) func() }} >
                <Image style={p.imstyle} source={src} />
            </TouchableOpacity>
        )
    }
}