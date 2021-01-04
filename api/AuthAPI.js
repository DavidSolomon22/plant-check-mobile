import axios from 'axios';
import { AUTH_ORIGIN } from '@env';

export const registerUser = async (email, password) => {
  // try {
  // } catch (error) {
  //   console.log('my error', error);
  //   console.log(error.response.data);
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  // }
  const url = `${AUTH_ORIGIN}auth/register`;
  const body = { email, password };
  console.log('URL', url);
  return axios.post(url, body);
};
export const loginUser = (email, password) => {
  // try {
  // } catch (error) {
  //   console.log('my error', error);
  //   console.log(error.response.data);
  //   console.log(error.response.status);
  //   console.log(error.response.headers);
  // }
  const url = `${AUTH_ORIGIN}auth/login`;
  const body = { email, password };
  console.log('URL', url);
  return axios.post(url, body);
};
