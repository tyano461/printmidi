import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './hooks/AuthContext';
import { AuthScreen } from './screens/AuthScreen';
import { DetailsScreen } from './screens/DetailsScreen';
import { HomeScreen } from './screens/HomeScreen';

export type RootStackParams = {
  Auth: undefined;
  Home: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App: React.FC = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
        <NavigationContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

const NavigationContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Group screenOptions={{ headerShown: true }}
          >

            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;































































