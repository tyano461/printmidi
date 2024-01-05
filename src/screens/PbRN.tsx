import React from "react"
import { Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../App';
import { resetNavigate } from "../modules/misc";

const imagesource = require("../../assets/pbrn.png");

export const PbRN: React.FC<
    NativeStackScreenProps<RootStackParams, 'PbRN'>
> = ({ navigation }) => {

    setTimeout(() => {
        resetNavigate(navigation, 'Home');
    }, 1000);
    return (
        <>
            <Image source={imagesource} style={styles.pbrn} />
        </>
    );
}

const styles = StyleSheet.create({
    pbrn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
