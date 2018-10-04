import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserRequest: ['user', 'paramId', 'storeCnpj', 'showSalesValues'],
  getUserSuccess: ['successMessage'],
  getUserFailure: ['error'],

  deleteUserRequest: ['userSelected', 'paramId'],
  deleteUserSuccess: ['successMessage'],
  deleteUserFailure: ['error'],

  editUserRequest: ['user', 'paramId', 'storeCnpj', 'userSelected', 'showSalesValues'],
  editUserSuccess: ['successMessage'],
  editUserFailure: ['error'],

  getListRequest: ['paramId', 'storeCnpj'],
  getListSuccess: ['shopUsers'],
});

export default Creators;
