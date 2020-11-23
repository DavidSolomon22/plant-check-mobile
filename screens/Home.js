import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PhotoButton from '../components/icons/PhotoButton';
import Leaf from '../components/icons/Leaf';
import StatusBarCustom from '../components/StatusBarCustom';
import { Colors } from '../styles';
// ai specific imports
import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

const Home = ({ navigation }) => {
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
      // console.log('MODEL:', model.predict();
      setModel(loadedModel); // load the model to the state
      // const rosemoet = require('../assets/images/rosemoet.jpg');
      const img = Asset.fromModule(require('../assets/images/rosemoet.jpg'));
      await img.downloadAsync();
      const imgB64 = await FileSystem.readAsStringAsync(img.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
      const raw = new Uint8Array(imgBuffer);

      const imgTensor = imgToTensor(raw);
      // console.log(imgTensor);
      const prediction = loadedModel.predict(imgTensor);
      console.log(prediction.dataSync()[0]);

      // getPermissionAsync(); // get the permission for camera roll access for iOS users
    })();
  }, []);

  function imgToTensor(imgRaw) {
    const { width, height, data } = jpeg.decode(imgRaw, true);
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset];
      buffer[i + 1] = data[offset + 1];
      buffer[i + 2] = data[offset + 2];
      offset += 4;
    }
    return tf.tensor4d(buffer, [1, height, width, 3]);
  }

  return (
    <View style={styles.container}>
      <StatusBarCustom />
      <TouchableOpacity onPress={() => navigation.navigate('TakePhotoScreen')}>
        <PhotoButton />
      </TouchableOpacity>
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
