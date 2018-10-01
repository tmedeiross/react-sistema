import { createReducer } from 'reduxsauce';
import { Types } from './authCreators';

// Reducers
const INITIAL_STATE = {
  user: {},
  userShop: {},
  errorMessage: '',
  successMessage: '',
  isLoading: false,
  userStore: false,
};

export const getUserRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
});

export const getUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  user: action.user,
  errorMessage: '',
  successMessage: action.success,
  userStore: action.userStore,
});

export const getUserFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  user: {},
  errorMessage: action.error,
});

export const HANDLERS = {
  [Types.GET_REQUEST]: getUserRequest,
  [Types.GET_SUCCESS]: getUserSuccess,
  [Types.GET_FAILURE]: getUserFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
