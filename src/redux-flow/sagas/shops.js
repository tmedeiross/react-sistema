import { call, put } from 'redux-saga/effects';
import http, { setTokenHeader } from '../../utils/services/http';

import { Creators as ShopActions } from '../ducks/shops';

setTokenHeader(localStorage.getItem('token'));

export function* getShop(action) {
  try {
    const response = yield call(http.get, '/store');
    yield put(ShopActions.getShopSuccess(response.data.content));
    yield console.log(response.data.content);
  } catch (err) {
    console.log(err);
  }
}
