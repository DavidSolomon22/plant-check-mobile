import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const SecondScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SecondScreen</Text>
    </SafeAreaView>
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

export default SecondScreen;
