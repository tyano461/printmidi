import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParams} from '../App';

export const HomeScreen: React.FC<
  NativeStackScreenProps<RootStackParams, 'Home'>
> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        
        <Button
          title="詳細画面へ"
          onPress={() => navigation.navigate('Details')}
        />
        <Button title="ログアウト" onPress={() => navigation.navigate('Details')} />
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
