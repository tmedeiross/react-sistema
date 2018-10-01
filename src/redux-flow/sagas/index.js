import { all, takeLatest } from 'redux-saga/effects';
import { Types } from '../ducks/authCreators';
import { getAuth } from './auth';
import { getShop } from './shops';
import { Types as ShopTypes } from '../ducks/shops';
// import { getAuth } from './auth';

export default function* rootSaga() {
  yield all([takeLatest(Types.GET_REQUEST, getAuth), takeLatest(ShopTypes.GET_REQUEST, getShop)]);
}
