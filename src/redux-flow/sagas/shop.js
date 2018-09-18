import { call, put } from 'redux-saga/effects';
import http, { setTokenHeader } from '../../utils/services/http';

import { Creators as ShopActions } from '../ducks/shop';

setTokenHeader(localStorage.getItem('token'));

export function* getShopId(action) {
  try {
    const response = yield call(http.get, `/store/${id}`);
    yield put(ShopActions.getShopSuccess(response.data.content));
  } catch (err) {
    console.log(err);
  }
}
