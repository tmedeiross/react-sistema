import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

export const getShops = () => http.get('/store');
export const storeAll = () => http.get('/store');
export const storeNew = data => http.post('/store', data);
export const storeGet = id => http.get(`/store/${id}`);
export const storeDel = id => http.delete(`/store/${id}`);
export const storePut = (id, data) => http.put(`/store/${id}`, data);
