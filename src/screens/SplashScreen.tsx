import React from "react"
import { Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { resetNavigate } from "../modules/misc";

const imagesource = require("../../assets/splash.png");

export const SplashScreen: React.FC<
    NativeStackScreenProps<RootStackParams, 'Splash'>
> = ({ navigation }) => {
    setTimeout(() => {
        resetNavigate(navigation, 'PbRN');
    }, 1000);
    return (
        <>
            <Image source={imagesource} style={styles.logo} />
        </>
    );
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});