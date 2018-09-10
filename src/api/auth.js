import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

export const login = data => http.post('/login', data);
export const user = data => http.post('/user', data);
export const getUser = email => http.get(`/user/${email}`);
export const confirmUser = token => http.get(`/user/registration/confirm?token=${token}`);

export const storeAll = data => http.get('/store', data);
export const storeNew = data => http.post('/store', data);
export const storeGet = id => http.get(`/store/${id}`);
export const storeDel = id => http.delete(`/store/${id}`);
export const storePut = (id, data) => http.put(`/store/${id}`, data);

export const addUserShop = data => http.post('/user/profile', data);
