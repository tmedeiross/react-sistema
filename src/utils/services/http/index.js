import axios from 'axios';
import interceptors from './interceptors';

import { API_URL } from '../../../config';

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Cache-Control': 'no-cache',
  },
  timeout: 10000,
});

interceptors(http);

export const setTokenHeader = (token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const unsetTokenHeader = (token) => {
  http.defaults.headers.common.Authorization = null;
};

export default http;
