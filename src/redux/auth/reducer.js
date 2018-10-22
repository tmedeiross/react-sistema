// Types
export const Types = {
  USER_REQUEST: "auth/LOGIN_USER_REQUEST",
  USER_SUCCESS: "auth/LOGIN_USER_SUCCESS",
  USER_FAILURE: "auth/LOGIN_USER_FAILURE",

  PASS_RECOVER_REQUEST: "auth/PASS_RECOVER_REQUEST",
  PASS_RECOVER_SUCCESS: "auth/PASS_RECOVER_SUCCESS",
  PASS_RECOVER_FAILURE: "auth/PASS_RECOVER_FAILURE",

  PASS_CHANGE_REQUEST: "auth/PASS_CHANGE_REQUEST",
  PASS_CHANGE_SUCCESS: "auth/PASS_CHANGE_SUCCESS",
  PASS_CHANGE_FAILURE: "auth/PASS_CHANGE_FAILURE",

  CREATE_ACCOUNT_REQUEST: "auth/CREATE_ACCOUNT_REQUEST",
  CREATE_ACCOUNT_SUCCESS: "auth/CREATE_ACCOUNT_SUCCESS",
  CREATE_ACCOUNT_FAILURE: "auth/CREATE_ACCOUNT_FAILURE",

  GET_USER_REQUEST: "auth/GET_USER_REQUEST",
  GET_USER_SUCCESS: "auth/GET_USER_SUCCESS",
  GET_USER_FAILURE: "auth/GET_USER_FAILURE",

  USER_STORE: "auth/USER_STORE",
  SET_AUTH: "auth/SET_AUTH"
};

// Reducer
const INITIAL_STATE = {
  user: [],
  userDetails: [],
  loading: false,
  errorMessage: "",
  successMessage: "",
  oldPassword: "",
  newPassword: "",
  userStore: false,
  isAuthenticated: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Types.USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user
      };
    case Types.USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.USER_STORE:
      return {
        ...state,
        loading: false,
        userStore: action.payload.userStore
      };
    case Types.SET_AUTH:
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case Types.PASS_RECOVER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.PASS_RECOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.successMessage
      };
    case Types.PASS_RECOVER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.PASS_CHANGE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.PASS_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.successMessage
      };
    case Types.PASS_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.CREATE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.successMessage
      };
    case Types.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    case Types.GET_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case Types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: action.payload.userDetails
      };
    case Types.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.errorMessage
      };
    default:
      return { ...state };
  }
};

// Actions
export const Creators = {
  userRequest: (user, history) => ({
    type: Types.USER_REQUEST,
    payload: { user, history }
  }),
  userSuccess: user => ({
    type: Types.USER_SUCCESS,
    payload: { user }
  }),
  userFailure: errorMessage => ({
    type: Types.USER_FAILURE,
    payload: { errorMessage }
  }),

  passRecoverRequest: (email, history) => ({
    type: Types.PASS_RECOVER_REQUEST,
    payload: { email }
  }),
  passRecoverSuccess: successMessage => ({
    type: Types.PASS_RECOVER_SUCCESS,
    payload: { successMessage }
  }),
  passRecoverFailure: errorMessage => ({
    type: Types.PASS_RECOVER_FAILURE,
    payload: { errorMessage }
  }),

  passChangeRequest: (data, history) => ({
    type: Types.PASS_CHANGE_REQUEST,
    payload: { data, history }
  }),
  passChangeSuccess: successMessage => ({
    type: Types.PASS_CHANGE_SUCCESS,
    payload: { successMessage }
  }),
  passChangeFailure: errorMessage => ({
    type: Types.PASS_CHANGE_FAILURE,
    payload: { errorMessage }
  }),

  createAccountRequest: (data, history) => ({
    type: Types.CREATE_ACCOUNT_REQUEST,
    payload: { data, history }
  }),
  createAccountSuccess: successMessage => ({
    type: Types.CREATE_ACCOUNT_SUCCESS,
    payload: { successMessage }
  }),
  createAccountFailure: errorMessage => ({
    type: Types.CREATE_ACCOUNT_FAILURE,
    payload: { errorMessage }
  }),

  getUserRequest: (data, history) => ({
    type: Types.GET_USER_REQUEST,
    payload: { data, history }
  }),
  getUserSuccess: userDetails => ({
    type: Types.GET_USER_SUCCESS,
    payload: { userDetails }
  }),
  getUserFailure: errorMessage => ({
    type: Types.GET_USER_FAILURE,
    payload: { errorMessage }
  }),

  userStore: userStore => ({
    type: Types.USER_STORE,
    payload: { userStore }
  }),
  setAuth: isAuthenticated => ({
    type: Types.SET_AUTH,
    payload: isAuthenticated
  })
};
