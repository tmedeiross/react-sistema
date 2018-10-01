import { combineReducers } from 'redux';
import loader from '../reducers/loader';
import shops from '../reducers/shops';
import auth from '../reducers/auth';
import authData from './auth';
import shopData from './shops';
import shop from './shop';

export default combineReducers({
  loader,
  shops,
  auth,
  authData,
  shopData,
  shop,
});
