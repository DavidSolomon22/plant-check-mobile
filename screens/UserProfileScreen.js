import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import LoginRegisterScreen from './LoginRegisterScreen';

const UserProfileScreen = () => {
  return <LoginRegisterScreen />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {},
});

export default UserProfileScreen;
