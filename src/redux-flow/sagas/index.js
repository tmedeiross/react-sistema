import { all, takeLatest } from 'redux-saga/effects';
import { Types as AuthTypes } from '../ducks/authCreators';
import { Types as ShopUserTypes } from '../ducks/shopCreators';
import { Types as ShopTypes } from '../ducks/shops';
// import * as AuthAPI from '../../../api/auth';
import {
  getAuth, changePass, editProfile, setUser,
} from './auth';
import { getShop } from './shops';
import {
  getUserShop, getUserList, deleteUserShop, editUserShop,
} from './shop';

export default function* rootSaga() {
  yield all([
    takeLatest(AuthTypes.GET_REQUEST, getAuth),
    takeLatest(AuthTypes.GET_PASS_REQUEST, changePass),
    takeLatest(AuthTypes.UPDATE_USER_REQUEST, editProfile),
    takeLatest(ShopTypes.GET_REQUEST, getShop),
    takeLatest(ShopUserTypes.GET_USER_REQUEST, getUserShop),
    takeLatest(ShopUserTypes.GET_LIST_REQUEST, getUserList),
    takeLatest(ShopUserTypes.DELETE_USER_REQUEST, deleteUserShop),
    takeLatest(ShopUserTypes.EDIT_USER_REQUEST, editUserShop),
  ]);
}
