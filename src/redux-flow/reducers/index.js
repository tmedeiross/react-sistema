import { combineReducers } from 'redux';
import loader from './loader';
import shops from './shops';
import auth from './auth';

export default combineReducers({
  loader,
  shops,
  auth,
});
