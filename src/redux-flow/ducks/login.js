// Types
export const Types = {
  GET_REQUEST: 'shops/GET_LOGIN_REQUEST',
  GET_SUCCESS: 'shops/GET_LOGIN_SUCCESS',
};

// Reducer
const INITIAL_STATE = {
  data: [],
  loading: false,
};

export default function shops(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_REQUEST:
      return { ...state, loading: false };
    case Types.GET_SUCCESS:
      return { ...state, loading: false, data: action.payload.data };
    default:
      return state;
  }
}

// Actions
export const Creators = {
  getShopRequest: () => ({
    type: Types.GET_REQUEST,
  }),

  getShopSuccess: data => ({
    type: Types.GET_SUCCESS,
    payload: { data },
  }),
};
