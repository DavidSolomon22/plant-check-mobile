import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';

const LoginRegisterScreen = (props) => {
  const screenTitle = props.isItLogin ? 'LOG IN' : 'REGISTER';

  return (
    <View style={styles.container}>
      <Text style={styles.greenText}>LOG IN </Text>
      <Text style={styles.blackText}>TO PROCEED </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '40%',
  },
  greenText: {
    color: Colors.green,
    fontFamily: 'Staatliches',
    fontSize: 50,
    // paddingLeft: '7%',
    backgroundColor: 'grey',
    paddingBottom: 0,
    // textAlignVertical: 'bottom',
    // justifyContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  blackText: {
    color: Colors.black,
    fontFamily: 'Staatliches',
    fontSize: 50,
    paddingLeft: '25%',
  },
});

export default LoginRegisterScreen;
