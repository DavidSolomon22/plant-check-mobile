import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
import LoginRegisterForm from '../components/LoginRegisterForm';

const LoginRegisterScreen = (props) => {
  let screenTitle = 'LOG IN';
  if (props.isItLogin) {
    screenTitle = props.isItLogin ? 'LOG IN' : 'REGISTER';
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    >
      <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />
      <View style={styles.textContainer}>
        <Text style={styles.greenText}> {screenTitle} </Text>
        <Text style={styles.blackText}>TO PROCEED </Text>
      </View>
      <LoginRegisterForm isItLogin={true} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: '32%',
    paddingBottom: '5%',
  },
  greenText: {
    color: Colors.green,
    fontFamily: 'Staatliches',
    fontSize: 42,
    paddingLeft: '7%',
  },
  blackText: {
    color: Colors.black,
    fontFamily: 'Staatliches',
    fontSize: 42,
    paddingLeft: '20%',
  },
});

export default LoginRegisterScreen;
