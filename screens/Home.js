import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhotoButton from '../components/icons/PhotoButton';
import Leaf from '../components/icons/Leaf';

const Home = () => {
  return (
    <View style={styles.container}>
      <PhotoButton />
      <Text style={styles.text}>PRESS THE BUTTON TO TAKE PHOTO</Text>
      <Leaf style={[styles.leaf, styles.firstLeaf]} />
      <Leaf style={[styles.leaf, styles.secondLeaf]} />
      <Leaf style={[styles.leaf, styles.thirdLeaf]} />
      <Leaf style={[styles.leaf, styles.fourthLeaf]} />
      <Leaf style={[styles.leaf, styles.fifthLeaf]} />
      <Leaf style={[styles.leaf, styles.sixthLeaf]} />
      <Leaf style={[styles.leaf, styles.seventhLeaf]} />
      <Leaf style={[styles.leaf, styles.eighthLeaf]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Staatliches',
    fontSize: 25,
    marginTop: 30,
  },
  leaf: {
    position: 'absolute',
  },
  firstLeaf: {
    top: 80,
    left: 140,
    transform: [{ rotate: '60deg' }],
  },
  secondLeaf: {
    top: 160,
    left: 250,
  },
  thirdLeaf: {
    top: 200,
    left: 60,
  },
  fourthLeaf: {
    top: 460,
    left: 330,
    transform: [{ rotate: '40deg' }],
  },
  fifthLeaf: {
    top: 620,
    left: 170,
    transform: [{ rotate: '10deg' }],
  },
  sixthLeaf: {
    top: 680,
    left: 50,
    transform: [{ rotate: '50deg' }],
  },
  seventhLeaf: {
    top: 690,
    left: 280,
    transform: [{ rotate: '45deg' }],
  },
  eighthLeaf: {
    top: 750,
    left: 200,
    transform: [{ rotate: '-30deg' }],
  },
});

export default Home;
