import React from 'react';
import axios from 'axios';
import { AUTH_ORIGIN } from '../constants';

export const registerUser = async (email, password) => {
  const url = `${AUTH_ORIGIN}/auth/register`;
  const body = { email, password };
  return axios.post(url, body);
};
export const loginUser = (email, password) => {};
