import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getRequest: ['username', 'password'],
  getSuccess: ['user'],
  getShopSuccess: ['userStore'],
  getFailure: ['error'],

  authRequest: null,
  authSuccess: ['user'],
  authFailure: null,

  getPassRequest: ['oldPassword', 'newPassword'],
  getPassSuccess: ['successMessage'],
  getPassFailure: ['error'],
});

export default Creators;
