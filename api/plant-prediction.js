import { PLANT_PREDICTIONS_ORIGIN } from '@env';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export const createPlantPrediction = async (
  plantPhotoLocalUri,
  predictedPlantName,
) => {
  const userId = '5ff60586f4e988002b50b68e';
  const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;
  try {
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
  const userId = '5ff60586f4e988002b50b68e';
  const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;
  try {
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
