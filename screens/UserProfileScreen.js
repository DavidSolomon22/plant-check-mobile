import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginRegisterScreen from './LoginRegisterScreen';
import { registerUser } from '../api/AuthAPI';

const UserProfileScreen = ({ navigation }) => {
  const goToLoginPage = () => {
    navigation.navigate('LoginRegisterScreen', { isItLogin: false });
  };

  return (
    <View style={[{ flex: 1 }, { justifyContent: 'center' }]}>
      <TouchableOpacity onPress={goToLoginPage}>
        <Text>Go to login page</Text>
      </TouchableOpacity>
    </View>
  );
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
