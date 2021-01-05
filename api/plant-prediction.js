import { PLANT_PREDICTIONS_ORIGIN } from '@env';
import axios from 'axios';

export const createPlantPrediction = async (photo, predictedPlantName) => {
  const userId = '5ff2e48238bb02002b27dc5a';
  const formData = new FormData();
  formData.append('plantPhoto', photo);
  formData.append('predictedPlantName', predictedPlantName);
  console.log(predictedPlantName);
  console.log(photo);
  const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;

  console.log(url);
  try {
    return axios.post(url, predictedPlantName, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
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

export const getUserPlantPredictions = async () => {
  const userId = '5ff2e48238bb02002b27dc5a';
  const url = `${PLANT_PREDICTIONS_ORIGIN}/users/${userId}/plants-predictions`;
  console.log(url);
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
