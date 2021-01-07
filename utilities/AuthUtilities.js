import React, { createContext } from 'react';
import { loginUser, registerUser } from '../api/AuthAPI';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

export const AuthContext = createContext();

export const signIn = async (userName, password, dispatch) => {
  try {
    let userToken;
    userToken = null;
    const response = await loginUser(userName, password);

    if (response.status === 201) {
      userToken = response.data.access_token;
      await SecureStore.setItemAsync(
        'access_token',
        response.data.access_token,
      );
      await SecureStore.setItemAsync(
        'refresh_token',
        response.data.refresh_token,
      );
      await SecureStore.setItemAsync('userId', response.data.userId);
      dispatch({
        type: 'LOGIN',
        id: userName,
        token: userToken,
      });
    }
  } catch (error) {
    Toast.show({
      text1: 'Log in again 🤔',
      text2: 'Wrong username or password',
      visibilityTime: 6000,
      type: 'error',
      topOffset: 50,
    });
    console.log('my error', error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
};

export const signOut = async (dispatch) => {
  try {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('userId');

    dispatch({ type: 'LOGOUT' });
  } catch (error) {}
};

export const signUp = async (
  userName,
  password,
  redirectToLoginRegister,
  dispatch,
) => {
  try {
    const response = await registerUser(userName, password);

    if (response.status === 201) {
      Toast.show({
        text1: 'Account sucessfully created 😎',
        text2: 'Please log in',
        visibilityTime: 6000,
        type: 'success',
        topOffset: 50,
      });
      redirectToLoginRegister();
      dispatch({ type: 'REGISTER' });
    }
  } catch (error) {
    Toast.show({
      text1: 'Register again 🤔',
      text2: 'User with such e-mail already exists',
      visibilityTime: 6000,
      type: 'error',
      topOffset: 50,
    });
    console.log('my error', error);
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
};
