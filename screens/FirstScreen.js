import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native';

const FirstScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FirstScreen</Text>
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

export default FirstScreen;
