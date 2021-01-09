import { GATEWAY_ORIGIN } from '@env';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { axiosInstance } from '../utilities/Interceptors';
import { INTERCEPTOR_HOST } from '@env';

export const createPlantPrediction = async (
  plantPhotoLocalUri,
  predictedPlantName,
) => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    const url = `${GATEWAY_ORIGIN}/users/${userId}/plants-predictions`;
    const access_token = await SecureStore.getItemAsync('access_token');

    console.log('CREATE_PLANT_PREDICTION_access_token', access_token);

    return FileSystem.uploadAsync(url, plantPhotoLocalUri, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Host: INTERCEPTOR_HOST,
      },
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
    const url = `${GATEWAY_ORIGIN}/users/${userId}/plants-predictions`;
    console.log('PLANTY URL', url);

    return await axiosInstance.get(url);
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
