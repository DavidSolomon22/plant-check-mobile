import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
import LoginRegisterForm from '../components/LoginRegisterForm';
import { ScrollView } from 'react-native-gesture-handler';

const LoginRegisterScreen = (props) => {
  const [formValue, setFormValue] = useState({});

  const handleLoginRegistration = (userInputData) => {
    setFormValue(userInputData);
  };

  useEffect(() => {
    console.log('form Value:', formValue);
  }, [formValue]);

  let screenTitle = 'LOG IN';
  if (props.isItLogin) {
    screenTitle = props.isItLogin ? 'LOG IN' : 'REGISTER';
  }

  return (
    <KeyboardAvoidingView scrollEnabled={false} style={styles.container}>
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      >
        <View>
          <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />
          <View style={styles.textContainer}>
            <Text style={styles.greenText}> {screenTitle} </Text>
            <Text style={styles.blackText}>TO PROCEED </Text>
          </View>
          <LoginRegisterForm
            isItLogin={true}
            handleLoginRegistration={handleLoginRegistration}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    backgroundColor: 'blue',
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
