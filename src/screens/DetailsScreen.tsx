import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { RootStackParams } from '../App';

const Drawer = createDrawerNavigator();

export const DetailsScreen: React.FC<
  NativeStackScreenProps<RootStackParams, 'Details'>> = ({ navigation }) => {
    var keyboards = [];
    for (let i = 0; i < 20; i++) {
      keyboards.push(
        <View key={i} >
          <View style={{width:100, height:20, backgroundColor:"#FF0000", marginTop: "2px"}} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {keyboards}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  black_key: {
    width: 100,
    height: 20,
    backgroundColor: "black"
  },
  white_key: {
    width: 100,
    height: 20,
    backgroundColor: "white"
  },
});
