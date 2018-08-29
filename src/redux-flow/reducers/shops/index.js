import createReducer from '../create-reducer';
import * as actions from './actions';

const initialState = {
  shops: [],
  selectedShop: {},
};

const shops = createReducer(initialState, {
  [actions.ADD_SHOPS]: (state, action) => ({
    ...state,
    shops: action.payload || [],
  }),
  [actions.ADD_SHOP]: (state, action) => ({
    ...state,
    selectedShop: action.payload,
  }),
});

export default shops;
