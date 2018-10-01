import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getRequest: ['username', 'password'],
  getSuccess: ['user'],
  getShopSuccess: ['userStore'],
  getFailure: ['error'],

  authRequest: null,
  authSuccess: ['user'],
  authFailure: null,
});

export default Creators;
