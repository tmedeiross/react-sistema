import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getUserRequest: [''],
  getUserSuccess: ['user'],
  getUserFailure: ['error'],
});

export default Creators;
