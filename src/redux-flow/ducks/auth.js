import { createReducer } from 'reduxsauce';
import { Types } from './authCreators';

// Reducers
const INITIAL_STATE = {
  user: {},
  userShop: {},
  errorMessage: '',
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

export const getShopSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  userDatailsShop: action.shopUser,
});

export const getFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  user: {},
  errorMessage: action.error,
});

export const HANDLERS = {
  [Types.GET_REQUEST]: getRequest,
  [Types.GET_SUCCESS]: getSuccess,
  [Types.GET_SHOP_SUCCESS]: getShopSuccess,
  [Types.GET_FAILURE]: getFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
