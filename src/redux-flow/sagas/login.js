import { call, put } from 'redux-saga/effects';
import http, { setTokenHeader } from '../../utils/services/http';

import { Creators as LoginActions } from '../ducks/login';

setTokenHeader(localStorage.getItem('token'));

export function* getUser(action) {
  try {
    const response = yield call(http.get, '/store');
    yield put(ShopActions.getShopSuccess(response.data.content));
  } catch (err) {
    console.log(err);
  }
}
