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
  userSelected: '',
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

export const editUserRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
});

export const editUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
  successMessage: action.successMessage,
});

export const editUserFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: action.error,
  isLoading: false,
});

export const deleteUserRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
});

export const deleteUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  isLoading: true,
  successMessage: action.successMessage,
});

export const deleteUserFailure = (state = INITIAL_STATE, action) => ({
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

  [Types.EDIT_USER_REQUEST]: editUserRequest,
  [Types.EDIT_USER_SUCCESS]: editUserSuccess,
  [Types.EDIT_USER_FAILURE]: editUserFailure,

  [Types.DELETE_USER_REQUEST]: deleteUserRequest,
  [Types.DELETE_USER_SUCCESS]: deleteUserSuccess,
  [Types.DELETE_USER_FAILURE]: deleteUserFailure,

  [Types.GET_LIST_REQUEST]: getListRequest,
  [Types.GET_LIST_SUCCESS]: getListSuccess,
};

export default createReducer(INITIAL_STATE, HANDLERS);
