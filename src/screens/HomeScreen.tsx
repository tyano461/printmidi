import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../App';
import { MainMenu } from '../components/MainMenu';

export const HomeScreen: React.FC<
  NativeStackScreenProps<RootStackParams, 'Main'>
> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <MainMenu option={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
