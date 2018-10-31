// Types
export const Types = {
  GET_REQUEST: "shops/GET_SHOPS_REQUEST",
  GET_SUCCESS: "shops/GET_SHOPS_SUCCESS",

  ADD_SHOP_REQUEST: "shop/SHOPS_ADD_SHOP_REQUEST",
  ADD_SHOP_SUCCESS: "shop/SHOPS_ADD_SHOP_SUCCESS",
  ADD_SHOP_FAILURE: "shop/SHOPS_ADD_SHOP_FAILURE",

  UPDATE_SHOP_REQUEST: "shop/SHOPS_UPDATE_SHOP_REQUEST",
  UPDATE_SHOP_SUCCESS: "shop/SHOPS_UPDATE_SHOP_SUCCESS",
  UPDATE_SHOP_FAILURE: "shop/SHOPS_UPDATE_SHOP_FAILURE",

  GET_DETAILS_SHOP_REQUEST: "shop/SHOPS_GET_DETAILS_SHOP_REQUEST",
  GET_DETAILS_SHOP_SUCCESS: "shop/SHOPS_GET_DETAILS_SHOP_SUCCESS",
  GET_DETAILS_SHOP_FAILURE: "shop/SHOPS_GET_DETAILS_SHOP_FAILURE",

  CHANGE_STATUS_SHOP_REQUEST: "shop/SHOPS_CHANGE_STATUS_SHOP_REQUEST",
  CHANGE_STATUS_SHOP_SUCCESS: "shop/SHOPS_CHANGE_STATUS_SHOP_SUCCESS",
  CHANGE_STATUS_SHOP_FAILURE: "shop/SHOPS_CHANGE_STATUS_SHOP_FAILURE"
};

// Reducer
const INITIAL_STATE = {
  data: {},
  loading: false,
  shops: {},
  errorMessage: "",
  successMessage: "",
  dataList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: false };
    case Types.GET_SUCCESS:
      return {
        ...state,
        loading: false,
        dataList: action.payload.dataList
      };
    case Types.ADD_SHOP_REQUEST:
      return {
        ...state,
        errorMessage: "",
        successMessage: ""
      };
    case Types.ADD_SHOP_SUCCESS:
      return {
        ...state,
        shops: action.payload.shops,
        successMessage: action.payload.successMessage
      };
    case Types.ADD_SHOP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case Types.GET_DETAILS_SHOP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.GET_DETAILS_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        dataDetails: action.payload.dataDetails
      };
    case Types.GET_DETAILS_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.UPDATE_SHOP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.successMessage
      };
    case Types.UPDATE_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.ADD_USER_SHOP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.ADD_USER_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.successMessage
      };
    case Types.ADD_USER_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.CHANGE_STATUS_SHOP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.CHANGE_STATUS_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.successMessage
      };
    case Types.CHANGE_STATUS_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
};

// Actions
export const Creators = {
  getShopRequest: () => ({
    type: Types.GET_REQUEST
  }),
  getShopSuccess: dataList => ({
    type: Types.GET_SUCCESS,
    payload: { dataList }
  }),
  addShopRequest: (shop, history) => ({
    type: Types.ADD_SHOP_REQUEST,
    payload: { shop, history }
  }),
  addShopSuccess: successMessage => ({
    type: Types.ADD_SHOP_SUCCESS,
    payload: { successMessage }
  }),
  addShopFailure: errorMessage => ({
    type: Types.ADD_SHOP_FAILURE,
    payload: { errorMessage }
  }),
  updateShopRequest: (shop, history) => ({
    type: Types.UPDATE_SHOP_REQUEST,
    payload: { shop, history }
  }),
  updateShopSuccess: successMessage => ({
    type: Types.UPDATE_SHOP_SUCCESS,
    payload: { successMessage }
  }),
  updateShopFailure: errorMessage => ({
    type: Types.UPDATE_SHOP_FAILURE,
    payload: { errorMessage }
  }),
  getDetailsShopRequest: history => ({
    type: Types.GET_DETAILS_SHOP_REQUEST,
    payload: { history }
  }),
  getDetailsShopSuccess: dataDetails => ({
    type: Types.GET_DETAILS_SHOP_SUCCESS,
    payload: { dataDetails }
  }),
  getDetailsShopFailure: errorMessage => ({
    type: Types.GET_DETAILS_SHOP_FAILURE,
    payload: { errorMessage }
  }),
  addUserShopRequest: history => ({
    type: Types.ADD_USER_SHOP_REQUEST,
    payload: { history }
  }),
  addUserShopSuccess: data => ({
    type: Types.ADD_USER_SHOP_SUCCESS,
    payload: { data }
  }),
  addUserShopFailure: errorMessage => ({
    type: Types.ADD_USER_SHOP_FAILURE,
    payload: { errorMessage }
  }),
  changeStatusShopRequest: (data, history) => ({
    type: Types.CHANGE_STATUS_SHOP_REQUEST,
    payload: { data, history }
  }),
  changeStatusShopSuccess: data => ({
    type: Types.CHANGE_STATUS_SHOP_SUCCESS,
    payload: { data }
  }),
  changeStatusShopFailure: errorMessage => ({
    type: Types.CHANGE_STATUS_SHOP_FAILURE,
    payload: { errorMessage }
  })
};
