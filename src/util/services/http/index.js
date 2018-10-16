import axios from "axios";
import interceptors from "./interceptors";

import { apiUrl } from "Constants/defaultValues";

export const http = axios.create({
  baseURL: apiUrl,
  headers: {
    "Cache-Control": "no-cache"
  },
  timeout: 10000
});

interceptors(http);

export const setTokenHeader = token => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const unsetTokenHeader = token => {
  http.defaults.headers.common.Authorization = null;
};

export default http;
