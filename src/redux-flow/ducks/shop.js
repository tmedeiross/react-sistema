import { createReducer } from 'reduxsauce';
import { Types } from './shopCreators';

// Reducers
const INITIAL_STATE = {
  errorMessage: '',
  successMessage: '',
  isLoading: false,
  paramId: '',
  storeCnpj: '',
  showSalesValues: true,
};

export const getUserRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
});

export const getUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  successMessage: action.successMessage,
});

export const getUserFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: action.error,
  isLoading: false,
});

export const HANDLERS = {
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
