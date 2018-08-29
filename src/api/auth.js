import http from '../utils/services/http';

export const login = data => http.post('/login', data);
export const user = data => http.post('/user', data);
export const storeAll = data => http.get('/store', data);
export const storeNew = data => http.post('/store', data);
export const storeDel = data => http.delete(`/store/${data.id}`, data);
export const storePut = data => http.put(`/store/${data.id}`, data);
export const storeGet = data => http.get(`/store/${data.id}`, data);
