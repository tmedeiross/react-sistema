import { all, takeLatest } from 'redux-saga/effects';
import { Types } from '../ducks/authCreators';
import { Types as ShopUserTypes } from '../ducks/shopCreators';
import { getAuth } from './auth';
import { getShop } from './shops';
import { getUserShop, getUserList, deleteUserShop } from './shop';
import { Types as ShopTypes } from '../ducks/shops';

export default function* rootSaga() {
  yield all([
    takeLatest(Types.GET_REQUEST, getAuth),
    takeLatest(ShopTypes.GET_REQUEST, getShop),
    takeLatest(ShopUserTypes.GET_USER_REQUEST, getUserShop),
    takeLatest(ShopUserTypes.GET_LIST_REQUEST, getUserList),
    takeLatest(ShopUserTypes.DELETE_USER_REQUEST, deleteUserShop),
  ]);
}
