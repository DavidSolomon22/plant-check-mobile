import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhotoButton from '../components/icons/PhotoButton';
import Leaf from '../components/icons/Leaf';

const Home = () => {
  return (
    <View>
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
  text: {
    marginTop: 30,
  },
  leaf: {
    position: 'absolute',
  },
  firstLeaf: {
    top: -180,
    left: 50,
    transform: [{ rotate: '60deg' }],
  },
  secondLeaf: {
    top: -100,
    left: 170,
  },
  thirdLeaf: {
    top: -50,
    left: -30,
  },
  fourthLeaf: {
    top: 210,
    left: 250,
    transform: [{ rotate: '40deg' }],
  },
  fifthLeaf: {
    top: 350,
    left: 80,
    transform: [{ rotate: '10deg' }],
  },
  sixthLeaf: {
    top: 400,
    left: -50,
    transform: [{ rotate: '50deg' }],
  },
  seventhLeaf: {
    top: 410,
    left: 210,
    transform: [{ rotate: '45deg' }],
  },
  eighthLeaf: {
    top: 480,
    left: 110,
    transform: [{ rotate: '-30deg' }],
  },
});

export default Home;
