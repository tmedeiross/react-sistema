import { all, takeLatest } from 'redux-saga/effects';
import { getShop } from './shops';
import { Types as ShopTypes } from '../ducks/shops';

export default function* rootSaga() {
  yield all([takeLatest(ShopTypes.GET_REQUEST, getShop)]);
}
