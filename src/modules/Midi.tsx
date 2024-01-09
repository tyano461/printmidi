
export interface KeyboardProperties {
    play?: string
}

export default class Midi {
    constructor() {

    }

    handleInstrument(props: KeyboardProperties ){
        if (props.play && props.play.length > 0) {
            if (props.play === "play") {

            }
        }
    }
}
