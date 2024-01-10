import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParams } from '../App';
import { Keyboards } from '../components/Keyboards';
import { NoteFrame, TrackDataProperties } from '../components/NoteFrame';
import { KeyboardHeader } from '../components/KeyboardHeader';
import Midi, { KeyboardProperties } from '../modules/Midi';


export const KeyboardScreen: React.FC<{
  navigation: NativeStackScreenProps<RootStackParams, 'KBD'>, props?: TrackDataProperties
}> = ({navigation, props}) => {
  if (!props?.trackno) {
    props = {
      trackno: 0,
      measure: 0
    }
  }
  const [track, setTrack] = useState(props)
  const [channel, setChannel] = useState(0)

  const midi = new Midi()

  const handler = (arg: KeyboardProperties) => {
    midi.handleInstrument(arg)
    console.log("call handler")
  }

  const scrollstyle = {
    ...styles.container,
    top: 25,
  }

  console.log("sc track:" + track?.trackno + " nav:" + Object.keys(navigation))
  return (
    <View style={{ flex: 1 }}>
      <KeyboardHeader handler={handler} track={track} options={{ "navigation": navigation }} />
      <ScrollView style={scrollstyle}>
        <View style={{ flexDirection: 'row' }}>
          <Keyboards track={track} />
          <NoteFrame />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000000",
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
  }
});
