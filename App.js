import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SinglePlant from './components/SinglePlant';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>PLANT IDENTIFCATION</Text>
      <Text>HISTORY</Text>
      <StatusBar style="auto" />
      <SinglePlant plantName="CACTUS" />
      {/* <SinglePlant plantName="CACTUS1" />
      <SinglePlant plantName="CACTUS2" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
