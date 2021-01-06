import { PLANT_PREDICTIONS_ORIGIN } from '@env';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const createPlantPrediction = async (
  plantPhotoLocalUri,
  predictedPlantName,
) => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;
    return await FileSystem.uploadAsync(url, plantPhotoLocalUri, {
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'plantPhoto',
      parameters: {
        predictedPlantName: predictedPlantName,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log('error.response.data :>> ', error.response.data);
      console.log('error.response.status :>> ', error.response.status);
      console.log('error.response.headers :>> ', error.response.headers);
    } else if (error.request) {
      console.log('error.request :>> ', error.request);
    } else {
      console.log('error.message :>> ', error.message);
    }
  }
};

export const getUserPlantPredictions = async () => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;

    return await axios.get(url);
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  }
};
