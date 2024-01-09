import { CommonActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../App'
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
// import { useWindowDimensions } from 'react-native';

export const resetNavigate = (nav: any, to: string) => {
    const navigation: StackNavigationProp<RootStackParams> = nav;
    const resetAction = CommonActions.reset({
        index: 0,
        routes: [
            { name: to }
        ]
    })
    navigation.dispatch(resetAction)
}

export const isBlackKey = (i: Int32):boolean => {
    const pos = i % 12
    switch (pos) {
        case 0:
        case 1:
            return false
        case 2:
            return true
        case 3:
            return false
        case 4:
            return true
        case 5:
            return false
        case 6:
            return true
        case 7:
        case 8:
            return false
        case 9:
            return true
        case 10:
            return false
        case 11:
            return true
    }
    return false
}

//const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
//export function ScreenHeight(): number {
//    return SCREEN_HEIGHT
//}
//export function ScreenWidth(): number {
//    return SCREEN_WIDTH
//}