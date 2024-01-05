import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DetailsScreen } from './screens/DetailsScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SplashScreen } from './screens/SplashScreen';
import { PbRN } from './screens/PbRN';

export type RootStackParams = {
  Auth: undefined;
  Home: undefined;
  Details: undefined;
  Splash: undefined;
  PbRN: undefined;
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
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ headerShown: true }}        >
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default App;































































