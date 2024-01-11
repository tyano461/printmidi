import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/HomeScreen';
import { SplashScreen } from './screens/SplashScreen';
import { PbRN } from './screens/PbRN';
import { KeyboardScreen } from './screens/KeyboardScreen';
import { TrackList } from './screens/TrackList';
import { LicenseScreen } from './screens/LicenseScreen';

export type RootStackParams = {
  Auth: undefined;
  Splash: undefined;
  PbRN: undefined;
  Main: undefined;
  KBD: {} | undefined;
  Track: undefined;
  License: undefined
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <NavigationContent />
    </NavigationContainer>
  );
};

const NavigationContent: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false, animation: "fade" }}        >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="PbRN" component={PbRN} />
        <Stack.Screen name="Main" component={HomeScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: false }}        >
        <Stack.Screen name="KBD" component={KeyboardScreen} />
      </Stack.Group>
      <Stack.Screen name="Track" component={TrackList} />
      <Stack.Screen name="License" component={LicenseScreen} />
    </Stack.Navigator>
  );
};

export default App;































































