import { PLANT_PREDICTIONS_ORIGIN } from '@env';
import axios from 'axios';

export const createPlantPrediction = async () => {
  //   const userId = '5ff2e48238bb02002b27dc5a';
  //   const formData = new FormData();
  //   formData.append('plantPhoto', photo);
  //   formData.append('predictedPlantName', predictedPlantName);
  //   console.log(photo);
  //   const url = `${PLANT_PREDICTIONS_ORIGIN}users/${userId}/plants-predictions`;

  //   console.log(url);
  //   return axios.post(url, predictedPlantName, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  const url = `${PLANT_PREDICTIONS_ORIGIN}photos/f976c103-eb97-4e9c-bd27-d96331ef9d15.jpg`;
  try {
    return axios.get(url);
  } catch (e) {
    console.error('From axios', e);
    console.log(e.response.data);
    console.log(e.response.status);
    console.log(e.response.headers);
  }
};
