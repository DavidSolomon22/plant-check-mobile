import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const ThirdScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ThirdScreen</Text>
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

export default ThirdScreen;
