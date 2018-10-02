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
  shopUsers: [],
};

export const getUserRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
});

export const getUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
  successMessage: action.successMessage,
});

export const getUserFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: action.error,
  isLoading: false,
});

export const getListRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: true,
});

export const getListSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isLoading: false,
  shopUsers: action.shopUsers,
});

export const HANDLERS = {
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,

  [Types.GET_LIST_REQUEST]: getListRequest,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
