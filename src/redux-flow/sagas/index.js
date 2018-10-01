import { all, takeLatest } from 'redux-saga/effects';
import { Types } from '../ducks/authCreators';
import { Types as ShopUserTypes } from '../ducks/shopCreators';
import { getAuth } from './auth';
import { getShop } from './shops';
import { getUserShop } from './shop';
import { Types as ShopTypes } from '../ducks/shops';

export default function* rootSaga() {
  console.log('rootSaga');
  yield all([
    takeLatest(Types.GET_REQUEST, getAuth),
    takeLatest(ShopTypes.GET_REQUEST, getShop),
    takeLatest(ShopUserTypes.GET_USER_REQUEST, getUserShop),
  ]);
}
