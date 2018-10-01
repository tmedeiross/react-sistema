import { call, put } from 'redux-saga/effects';
import history from '../../utils/history';
import { setTokenHeader } from '../../utils/services/http';

import { setToken } from '../../utils/services/auth';
import * as AuthAPI from '../../api/auth';
import { setAuth } from '../reducers/auth/action-creators';
import ActionCreators from '../ducks/authCreators';
import { ROUTE_PREFIX as PREFIX } from '../../config';

setTokenHeader(localStorage.getItem('token'));

export function* getUserShop(action) {
  console.log('getUserAuth');
}
