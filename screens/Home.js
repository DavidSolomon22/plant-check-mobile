import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhotoButton from '../components/icons/PhotoButton';
import Leaf from '../components/icons/Leaf';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
// ai specific imports
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';

const Home = () => {
  const [isTfReady, setTfReady] = useState(false); // gets and sets the Tensorflow.js module loading status
  const [model, setModel] = useState(null); // gets and sets the locally saved Tensorflow.js model
  const [image, setImage] = useState(null); // gets and sets the image selected from the user
  const [predictions, setPredictions] = useState(null); // gets and sets the predicted value from the model
  const [error, setError] = useState(false); // gets and sets any errors

  useEffect(() => {
    (async () => {
      await tf.ready(); // wait for Tensorflow.js to get ready
      setTfReady(true); // set the state

      // bundle the model files and load the model:
      const model = require('../assets/ai/model.json');
      const weights = require('../assets/ai/weights.bin');
      const loadedModel = await tf.loadLayersModel(
        bundleResourceIO(model, weights),
      );

      const rosemoet = require('../assets/images/rosemoet.jpg');
      setModel(loadedModel); // load the model to the state

      // getPermissionAsync(); // get the permission for camera roll access for iOS users
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBarCustom bgColor={Colors.white} barStyle="dark-content" />
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
