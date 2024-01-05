import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import { RootStackParams } from '../App';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const Drawer = createDrawerNavigator();

export const DetailsScreen: React.FC<
  NativeStackScreenProps<RootStackParams, 'Details'>> = ({ navigation }) => {
    var keyboards = [];
    for (let i = 0; i < 20; i++) {
      keyboards.push(
        <View key={i} >
          <TouchableOpacity style={{ width: 100, height: 20, backgroundColor: "#FF0000", marginTop: "5%" }}
            onPress={() => console.log("pressed:" + i)} />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        {keyboards}
        <TouchableOpacity style={{ width: 20, height: 20, position: "absolute", left: 10, top: 10, backgroundColor: "#12345678", justifyContent: "center", alignItems: "center" }}
          onPress={() => console.log("track change")}         >
          <Text >1</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
