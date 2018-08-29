import createReducer from '../create-reducer';
import { LOADING_ON, LOADING_OFF } from './actions';

const initialState = {
  isLoading: false,
};

const loader = createReducer(initialState, {
  [LOADING_ON]: state => ({
    ...state,
    isLoading: true,
  }),
  [LOADING_OFF]: state => ({
    ...state,
    isLoading: false,
  }),
});

export default loader;
