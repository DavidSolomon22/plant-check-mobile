import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import stylesGlobal from '../styles/style';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import { Asset } from 'expo-asset';
import * as jpeg from 'jpeg-js';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const TakePhotoScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [displayPhoto, handleDisplayPhoto] = useState(false);
  const [isTfReady, setTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const [loding, setLoading] = useState(false);

  const handleTakePhoto = async () => {
    if (cameraRef) {
      const { uri, width, height } = await cameraRef.takePictureAsync();
      handleDisplayPhoto(true);
      setPhotoUri(uri);
    }
  };

  const predictPhoto = async () => {
    const classNames = ['daisy', 'dandelion', 'roses', 'sunflowers', 'tulips'];
    setLoading(true);
    await tf.ready();
    setTfReady(true);
    const model = require('../assets/ai/model.json');
    const weights = require('../assets/ai/weights.bin');
    const loadedModel = await tf.loadLayersModel(
      bundleResourceIO(model, weights),
    );
    setModel(loadedModel);
    const uriResize = await ImageManipulator.manipulateAsync(
      photoUri,
      [{ resize: { width: 180, height: 180 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
    );
    const imgB64 = await FileSystem.readAsStringAsync(uriResize.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const imgTensor = imgToTensor(raw);
    const prediction = await loadedModel.predict(imgTensor).data();
    console.log(prediction);
    let plantName = Array.from(prediction)
      .map(function (p, i) {
        return {
          probability: p,
          className: classNames[i],
        };
      })
      .sort(function (a, b) {
        return b.probability - a.probability;
      })
      .slice(0, 1);

    //const index = tf.argMax(prediction);
    console.log(plantName[0].className);
    setLoading(false);
  };

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
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (displayPhoto) {
    return (
      <ImageBackground source={{ uri: photoUri }} style={styles.photoContainer}>
        <View style={styles.spinner}>
          <ActivityIndicator animating={loding} size="large" color="#499D32" />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleDisplayPhoto(false);
          }}
        >
          <Text style={[styles.text, stylesGlobal.font]}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            predictPhoto();
            // navigation.navigate('SinglePlantScreen', {
            //   plantName: 'cactus',
            //   photoUrl: photo,
            //   isPhotoFromUrl: false,
            // });
          }}
        >
          <Text style={[styles.text, stylesGlobal.font]}>Predict</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <Camera
      style={styles.container}
      type={type}
      ref={(ref) => {
        setCameraRef(ref);
      }}
    >
      <View style={styles.takePhotoBox}>
        <TouchableOpacity onPress={handleTakePhoto}>
          <View style={styles.takePhotoButtonRoundShapeBox}>
            <View style={styles.takePhotoButton} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flipButton}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            );
          }}
        >
          <Text style={[styles.text, stylesGlobal.font]}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  takePhotoBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '8%',
  },
  takePhotoButtonRoundShapeBox: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhotoButton: {
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'white',
    height: 50,
    width: 50,
    backgroundColor: 'white',
  },
  flipButton: {
    position: 'absolute',
    right: '3%',
  },
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TakePhotoScreen;
