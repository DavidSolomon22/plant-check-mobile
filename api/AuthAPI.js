import axios from 'axios';
import { AUTH_ORIGIN } from '@env';

export const registerUser = async (email, password) => {
  const url = `${AUTH_ORIGIN}/auth/register`;
  const body = { email, password };
  console.log('URL', url);
  return axios.post(url, body);
};
export const loginUser = (email, password) => {
  const url = `${AUTH_ORIGIN}/auth/login`;
  const body = { email, password };
  console.log('URL', url);
  return axios.post(url, body);
};

export const refreshToken = (access_token, refresh_token) => {
  const url = `${AUTH_ORIGIN}/auth/refresh-token`;
  const body = { access_token, refresh_token };
  console.log('URL', url);
  return axios.post(url, body);
};
