import http, { setTokenHeader } from '../utils/services/http';

setTokenHeader(localStorage.getItem('token'));

// Generates a Token via login information (JSON)
export const login = data => http.post('/login', data);
// Forget password
export const forgetPassword = email => http.post(`/forget_password?email=${email}`);
// Changes a User password passed by token
export const changePassword = data => http.post('/change_password', data);
// Insert a new User into the database
export const user = data => http.post('/user', data);
// Search for a User by the informed email
export const getUser = email => http.get(`/user/${email}`);
// Registration confirm
export const confirmUser = token => http.get(`/user/registration/confirm?token=${token}`);

// listAll
export const storeAll = () => http.get('/store');
// Insert a new Store into the database
export const storeNew = data => http.post('/store', data);
// Search for a Store by the informed ID
export const storeGet = id => http.get(`/store/${id}`);
// Delete a Store
export const storeDel = id => http.delete(`/store/${id}`);
// Changes a Store
export const storePut = (id, data) => http.put(`/store/${id}`, data);

// Insert a new User Store into the database
export const addUserShop = data => http.post('/user/store', data);
// List all Store by User
export const getShopUser = id => http.get(`/user/${id}/store/`);
// Delete a User Store
export const deleteUserShop = id => http.delete(`/user/store/${id}`);
// Changes a User Store
export const updateUserShop = (id, data) => http.put(`/user/store/${id}`, data);
// List all Users by Store
export const allUsersStore = id => http.get(`/store/${id}/user/`);

// /supplier
export const listSupplier = () => http.get('/supplier');
// Insert a new Store's Supplier into the database
export const addSupplierStore = data => http.post('/store/supplier', data);
// List all Supplier by Store
export const listSupplierStore = id => http.get(`/store/${id}/supplier`);
// Delete a Store's Supplier
export const deleteSupplier = id => http.delete(`/store/supplier/${id}`);
