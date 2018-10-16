// Types
export const Types = {
  LIST_USER_REQUEST: "shop/LIST_USER_REQUEST",
  LIST_USER_SUCCESS: "shop/LIST_USER_SUCCESS",
  LIST_USER_FAILURE: "shop/LIST_USER_FAILURE",

  ADD_USER_REQUEST: "shop/ADD_USER_REQUEST",
  ADD_USER_SUCCESS: "shop/ADD_USER_SUCCESS",
  ADD_USER_FAILURE: "shop/ADD_USER_FAILURE",

  DELETE_USER_REQUEST: "shop/DELETE_USER_REQUEST",
  DELETE_USER_SUCCESS: "shop/DELETE_USER_SUCCESS",
  DELETE_USER_FAILURE: "shop/DELETE_USER_FAILURE",

  EDIT_USER_REQUEST: "shop/EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS: "shop/EDIT_USER_SUCCESS",
  EDIT_USER_FAILURE: "shop/EDIT_USER_FAILURE"
};

// Reducer
const INITIAL_STATE = {
  loading: false,
  errorMessage: "",
  successMessage: "",
  paramId: "",
  storeCnpj: "",
  showSalesValues: true,
  shopUsers: {},
  userSelected: true,
  userEmail: "",
  users: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.LIST_USER_REQUEST:
      return {
        ...state,
        errorMessage: "",
        successMessage: ""
      };
    case Types.LIST_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users
      };
    case Types.LIST_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case Types.ADD_USER_REQUEST:
      return {
        ...state,
        errorMessage: "",
        successMessage: ""
      };
    case Types.ADD_USER_SUCCESS:
      return {
        ...state,
        shops: action.payload.shops,
        successMessage: action.payload.successMessage
      };
    case Types.ADD_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case Types.DELETE_USER_REQUEST:
      return {
        ...state,
        errorMessage: "",
        successMessage: ""
      };
    case Types.DELETE_USER_SUCCESS:
      return {
        ...state,
        shops: action.payload.shops,
        successMessage: action.payload.successMessage
      };
    case Types.DELETE_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    case Types.EDIT_USER_REQUEST:
      return {
        ...state,
        errorMessage: "",
        successMessage: ""
      };
    case Types.EDIT_USER_SUCCESS:
      return {
        ...state,
        shops: action.payload.shops,
        successMessage: action.payload.successMessage
      };
    case Types.EDIT_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };

    default:
      return state;
  }
};

// Actions
export const Creators = {
  addUserRequest: (data, cnpj, history) => ({
    type: Types.ADD_USER_REQUEST,
    payload: { data, cnpj, history }
  }),
  addUserSuccess: successMessage => ({
    type: Types.ADD_USER_SUCCESS,
    payload: { successMessage }
  }),
  addUserFailure: errorMessage => ({
    type: Types.ADD_USER_FAILURE,
    payload: { errorMessage }
  }),

  deleteUserRequest: (data, history) => ({
    type: Types.DELETE_USER_REQUEST,
    payload: { data, history }
  }),
  deleteUserSuccess: successMessage => ({
    type: Types.DELETE_USER_SUCCESS,
    payload: { successMessage }
  }),
  deleteUserFailure: errorMessage => ({
    type: Types.DELETE_USER_FAILURE,
    payload: { errorMessage }
  }),

  editUserRequest: (users, history) => ({
    type: Types.EDITE_USER_REQUEST,
    payload: { users, history }
  }),
  editUserSuccess: successMessage => ({
    type: Types.EDITE_USER_SUCCESS,
    payload: { successMessage }
  }),
  editUserFailure: errorMessage => ({
    type: Types.EDITE_USER_FAILURE,
    payload: { errorMessage }
  }),

  listUserRequest: (cnpj, history) => ({
    type: Types.LIST_USER_REQUEST,
    payload: { cnpj, history }
  }),
  listUserSuccess: users => ({
    type: Types.LIST_USER_SUCCESS,
    payload: { users }
  }),
  listUserFailure: errorMessage => ({
    type: Types.LIST_USER_FAILURE,
    payload: { errorMessage }
  })
};
