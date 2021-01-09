import { useContext } from 'react';
import axios from 'axios';
import { GATEWAY_ORIGIN, INTERCEPTOR_HOST } from '@env';
import * as SecureStore from 'expo-secure-store';
import { refreshToken } from '../api/AuthAPI';
import { AuthContext } from '../utilities/AuthUtilities';

export const axiosInstance = axios.create({ baseURL: GATEWAY_ORIGIN });

export const requestInterceptor = () => {
  axiosInstance.interceptors.request.use(async (request) => {
    const accessToken = await SecureStore.getItemAsync('access_token');
    request.headers = {
      Authorization: `Bearer ${accessToken}`,
      Host: INTERCEPTOR_HOST,
    };

    console.log('AXIOS INTERCEPTOR REQUEST');

    return request;
  });
};

export const responseInterceptor = (dispatch) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.exp === 'token expired'
      ) {
        try {
          const access_token = await SecureStore.getItemAsync('access_token');
          const refresh_token = await SecureStore.getItemAsync('refresh_token');

          const response = await refreshToken(access_token, refresh_token);
          console.log('TOKEN REFRESH RESPONSE, ', response);

          await SecureStore.deleteItemAsync('access_token');
          await SecureStore.deleteItemAsync('refresh_token');

          await SecureStore.setItemAsync(
            'access_token',
            response.data.access_token,
          );
          await SecureStore.setItemAsync(
            'refresh_token',
            response.data.refresh_token,
          );
          console.log('error config', error.config);

          error.config.headers = {
            Authorization: `Bearer ${response.data.access_token}`,
          };
          return axiosInstance.request(error.config);
        } catch (refreshTokenError) {
          console.log('refreshTokenError', refreshTokenError.response);
          await SecureStore.deleteItemAsync('access_token');
          await SecureStore.deleteItemAsync('refresh_token');
          await SecureStore.deleteItemAsync('userId');
          dispatch({ type: 'LOGOUT' });
          return error;
        }
      }

      return error;
    },
  );
};
