import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

export const getShops = () => http.get('/store');
