import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserRequest: ['user', 'paramId', 'storeCnpj'],
  getUserSuccess: ['successMessage'],
  getUserFailure: ['error'],

  deleteUserRequest: ['userSelected', 'paramId'],
  deleteUserSuccess: ['successMessage'],
  deleteUserFailure: ['error'],

  editUserRequest: ['userSelected', 'paramId'],
  editUserSuccess: ['successMessage'],
  editUserFailure: ['error'],

  getListRequest: ['paramId', 'storeCnpj'],
  getListSuccess: ['shopUsers'],
});

export default Creators;
