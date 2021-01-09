import { GATEWAY_ORIGIN } from '@env';
import { axiosInstance } from '../utilities/Interceptors';

export const getPlantOverview = async (plantName) => {
  try {
    const url = `${GATEWAY_ORIGIN}/plant-infos/${plantName}/overview`;
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
export const getPlantDetails = async (plantName) => {
  try {
    console.log(plantName);
    const url = `${GATEWAY_ORIGIN}/plant-infos/${plantName}/details`;
    console.log('url', url);
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
