import { CommonActions } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParams } from '../App'

export const resetNavigate = (nav : any, to: string) => {
    const navigation : StackNavigationProp<RootStackParams> = nav;
        const resetAction = CommonActions.reset({
        index: 0,
        routes: [
            { name: to }
        ]
    })
    navigation.dispatch(resetAction)
}