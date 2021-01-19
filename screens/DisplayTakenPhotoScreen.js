import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  View,
} from 'react-native';
import stylesGlobal from '../styles/style';
import React, { useState, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Constants from '../constants';
import { createPlantPrediction } from '../api/PlantPredictionAPI';
import * as SecureStore from 'expo-secure-store';
import { refreshToken } from '../api/AuthAPI';
import { AuthContext } from '../utilities/AuthUtilities';

const DisplayTakenPhotoScreen = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext);

  const [isTfReady, setTfReady] = useState(false);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictPhoto = async () => {
    setLoading(true);
    const loadedModel = await loadNeuralNetwork();
    const raw = await convertImage();
    const imgTensor = imgToTensor(raw);
    const prediction = await loadedModel.predict(imgTensor).data();
    const predictedPlantName = getPlantName(prediction);
    const plantPhotoLocalUri = await resizeImage();
    const response = await createPlantPrediction(
      plantPhotoLocalUri,
      predictedPlantName,
    );

    if (response.status !== 401) {
      navigation.navigate('SinglePlantScreen', {
        plantName: predictedPlantName,
        photoUrl: JSON.parse(response.body).photoPath,
        goBackAsResetStack: true,
      });
      setLoading(false);
    }

    console.log('RESPONSE from posting prediction', response);

    if (response.status === 401) {
      try {
        const access_token = await SecureStore.getItemAsync('access_token');
        const refresh_token = await SecureStore.getItemAsync('refresh_token');

        const responseFromRefresh = await refreshToken(
          access_token,
          refresh_token,
        );
        console.log(
          'TOKEN REFRESH WHILE POSTING PREDICTION, ',
          responseFromRefresh,
        );

        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.setItemAsync(
          'access_token',
          responseFromRefresh.data.access_token,
        );
        await SecureStore.setItemAsync(
          'refresh_token',
          responseFromRefresh.data.refresh_token,
        );
        const newResponse = await createPlantPrediction(
          plantPhotoLocalUri,
          predictedPlantName,
        );

        console.log('TOKEN refreshed WHILE POSTING PREDICTION', newResponse);

        navigation.navigate('SinglePlantScreen', {
          plantName: predictedPlantName,
          photoUrl: JSON.parse(newResponse.body).photoPath,
          goBackAsResetStack: true,
        });
        setLoading(false);
      } catch (error) {
        console.log('TOKEN too old WHILE POSTING PREDICTION', error.response);
        await SecureStore.deleteItemAsync('access_token');
        await SecureStore.deleteItemAsync('refresh_token');
        await SecureStore.deleteItemAsync('userId');
        signOut();
      }
    }
  };

  const loadNeuralNetwork = async () => {
    await tf.ready();
    setTfReady(true);
    const model = require('../assets/ai/model.json');
    const weights = require('../assets/ai/weights.bin');
    const loadedModel = await tf.loadLayersModel(
      bundleResourceIO(model, weights),
    );
    setModel(loadedModel);
    return loadedModel;
  };

  const imgToTensor = (imgRaw) => {
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
  };

  const convertImage = async () => {
    const uriResize = await ImageManipulator.manipulateAsync(
      route.params.picture.uri,
      [{ resize: { width: 150, height: 150 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG },
    );
    const imgB64 = await FileSystem.readAsStringAsync(uriResize.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    return raw;
  };

  const resizeImage = async () => {
    const uriResize = await ImageManipulator.manipulateAsync(
      route.params.picture.uri,
      [
        {
          resize: {
            width: route.params.picture.width,
            height: route.params.picture.height,
          },
        },
      ],
      { compress: 0.2, format: ImageManipulator.SaveFormat.JPEG },
    );
    return uriResize.uri;
  };

  const getPlantName = (prediction) => {
    console.log('prediction :>> ', prediction);
    let plantName = Array.from(prediction)
      .map((p, i) => ({
        probability: p,
        className: Constants.PLANT_CLASS_NAMES[i],
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 1);
    return plantName[0].className;
  };

  const handleRetakePhoto = () => {
    navigation.navigate('TakePhotoScreen');
  };

  return (
    <ImageBackground
      source={{ uri: route.params.picture.uri }}
      style={[styles.photoContainer, loading ? styles.photoOpacity : null]}
    >
      <View style={styles.spinner}>
        <ActivityIndicator animating={loading} size="large" color="white" />
      </View>
      <TouchableOpacity onPress={handleRetakePhoto}>
        <Text style={[styles.text, stylesGlobal.font]}>Retake</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await predictPhoto();
        }}
      >
        <Text style={[styles.text, stylesGlobal.font]}>Predict</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: '5%',
  },

  photoOpacity: {
    opacity: 0.4,
  },
  text: {
    fontSize: 25,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
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

export default DisplayTakenPhotoScreen;
