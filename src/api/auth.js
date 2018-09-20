import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

export const login = data => http.post('/login', data);
// Forget password
export const forgetPassword = email => http.post(`/forget_password?email=${email}`);
export const user = data => http.post('/user', data);
export const getUser = email => http.get(`/user/${email}`);
export const confirmUser = token => http.get(`/user/registration/confirm?token=${token}`);

export const storeAll = () => http.get('/store');
export const storeNew = data => http.post('/store', data);
export const storeGet = id => http.get(`/store/${id}`);
export const storeDel = id => http.delete(`/store/${id}`);
export const storePut = (id, data) => http.put(`/store/${id}`, data);

// Insert a new User Store into the database
export const addUserShop = data => http.post('/user/store', data);
// Delete a User Store
export const deleteUserShop = id => http.delete(`/user/store/${id}`);
// Changes a User Store
export const updateUserShop = (id, data) => http.put(`/user/store/${id}`, data);
// List all Users by Store
export const allUsersStore = id => http.get(`/store/user/${id}`);
