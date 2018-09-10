import { combineReducers } from 'redux';
import loader from './loader';
import shops from './shops';
import auth from './auth';
import shop from './shop';

export default combineReducers({
  loader,
  shops,
  auth,
  shop,
});
