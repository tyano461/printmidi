import React from "react";
import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { PlayMode } from "../modules/Definitions";

const ASSETS = "../../assets/"

const icons = [
    { key: "main", val: require(ASSETS + "back.png") },
    { key: "write", val: require(ASSETS + "pencil.png") },
    { key: "erase", val: require(ASSETS + "eraser.png") },
    { key: PlayMode.Play, val: require(ASSETS + "play.png") },
    { key: PlayMode.Stop, val: require(ASSETS + "stop.png") },
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
        console.log("source:" + src + " st:" + p.style + " im:" + p.imstyle)
        const func: CallableFunction | undefined = p.onPress

        return (
            <TouchableOpacity style={p.style} onPress={() => { if (func) func() }} >
                <Image style={p.imstyle} source={src} />
            </TouchableOpacity>
        )
    }
}