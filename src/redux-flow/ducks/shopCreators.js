import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserRequest: ['user', 'paramId', 'storeCnpj'],
  getUserSuccess: ['successMessage'],
  getUserFailure: ['error'],
  getListRequest: ['paramId', 'storeCnpj'],
  getListSuccess: ['shopUsers'],
});

export default Creators;
