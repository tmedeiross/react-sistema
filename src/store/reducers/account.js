const INITIAL_STATE = {};

export default function account(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, { email: action.payload.user }];
    case 'GET_USER':
      return [...state, { id: Math.random(), user: action.payload.text }];
    default:
      return state;
  }
}
