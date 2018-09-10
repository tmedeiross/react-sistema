const INICIAL_STATE = [{ shopId: 4 }];

export default function shopId(state = INICIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// const initialState = {
//   shops: [],
//   selectedShop: {},
// };

// const shops = createReducer(initialState, {
//   [actions.ADD_SHOPS]: (state, action) => ({
//     ...state,
//     shops: action.payload || [],
//   }),
//   [actions.ADD_SHOP]: (state, action) => ({
//     ...state,
//     selectedShop: action.payload,
//   }),
// });
