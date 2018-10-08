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

export const getRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
});

export const getSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  user: action.user,
  errorMessage: '',
  userStore: action.userStore,
});

export const getFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  user: {},
  errorMessage: action.error,
});

export const getShopSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  userDatailsShop: action.shopUser,
});

export const getPassRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
});

export const getPassSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
  successMessage: action.successMessage,
});

export const getPassFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  successMessage: '',
  errorMessage: action.error,
});

export const updateUserRequest = (state = INITIAL_STATE, action) => ({
  ...state,
  errorMessage: '',
});

export const updateUserSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  user: action.user,
  errorMessage: '',
  userStore: action.name,
  successMessage: action.successMessage,
});

export const updateUserFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  user: {},
  errorMessage: action.error,
});

export const HANDLERS = {
  [Types.GET_REQUEST]: getRequest,
  [Types.GET_SUCCESS]: getSuccess,
  [Types.GET_FAILURE]: getFailure,

  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,

  [Types.GET_SHOP_SUCCESS]: getShopSuccess,

  [Types.GET_PASS_REQUEST]: getPassRequest,
  [Types.GET_PASS_SUCCESS]: getPassSuccess,
  [Types.GET_PASS_FAILURE]: getPassFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
