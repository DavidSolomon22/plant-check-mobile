import { PLANT_PREDICTIONS_ORIGIN } from '@env';
import axios from 'axios';

export const createPlantPrediction = async (photo, predictedPlantName) => {
  const userId = '5ff2e48238bb02002b27dc5a';
  const formData = new FormData();
  formData.append('plantPhoto', photo);
  formData.append('predictedPlantName', predictedPlantName);
  console.log(predictedPlantName);
  console.log(photo);
  const url = `http://172.20.10.2:8082/users/${userId}/plants-predictions`;

  console.log(url);
  try {
    return axios.post(url, predictedPlantName, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    });
  } catch (error) {
    // console.error('From axios', e);
    // console.log(e.response);
    // // console.log(e.response.status);
    // // console.log(e.response.headers);
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

  //   const url = `http://172.20.10.2:8082/photos/f976c103-eb97-4e9c-bd27-d96331ef9d15.jpg`;
  //   try {
  //     return axios.post(url,);
  //   } catch (e) {
  //     console.error('From axios', e);
  //     console.log(e.response.data);
  //     console.log(e.response.status);
  //     console.log(e.response.headers);
  //   }
};
