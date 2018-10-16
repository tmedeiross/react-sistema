import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { Types as ShopTypes } from "./reducer";
import { Creators as ShopActions } from "./reducer";

import * as AuthAPI from "Constants/api";

export function* addUser({ payload }) {
  const { profileId, userEmail, showSalesValues } = payload.data;
  const storeCnpj = payload.cnpj;

  try {
    const response = yield call(AuthAPI.addUserShop, {
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues
    });
    yield put(ShopActions.addUserSuccess("Usuário inserido com sucesso."));
  } catch (err) {
    if (err.status === 404) {
      yield put(
        ShopActions.addUserFailure("Usuário já está vinculado a esta loja.")
      );
    } else {
      yield put(ShopActions.addUserFailure("Dados incorretos ou faltantes."));
    }
  }
}

export function* listUser({ payload }) {
  const idString = payload.history.location.search;
  const storeID = idString.split("=");
  try {
    const response = yield call(AuthAPI.allUsersStore, storeID[1]);
    yield put(ShopActions.listUserSuccess(response.data.content));
    console.log(response.data.content);
  } catch (err) {
    console.log(err);
  }
}

export function* watchAddUser() {
  yield takeLatest(ShopTypes.ADD_USER_REQUEST, addUser);
}

export function* watchListUser() {
  yield takeLatest(ShopTypes.LIST_USER_REQUEST, listUser);
}

export default function* rootSaga() {
  yield all([fork(watchAddUser), fork(watchListUser)]);
}
