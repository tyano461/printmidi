import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

import {useAuth} from '../hooks/AuthContext';

export const AuthScreen: React.FC = () => {
  const {setIsAuthenticated} = useAuth();

  return (
    <View style={styles.container}>
      <Button title="ログイン" onPress={() => setIsAuthenticated(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
