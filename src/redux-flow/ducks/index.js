import { combineReducers } from 'redux';
import loader from '../reducers/loader';
import shops from '../reducers/shops';
import auth from '../reducers/auth';
import shopData from './shops';

export default combineReducers({
  loader,
  shops,
  auth,
  shopData,
});
