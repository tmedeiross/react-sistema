import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { Types as ShopTypes } from "./reducer";
import { Creators as ShopActions } from "./reducer";
import { delay } from "redux-saga";

import * as AuthAPI from "Constants/api";

export function* addUser({ payload }) {
  console.log(payload);
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

    // listUser
    const idString = payload.history.location.search;
    const storeID = idString.split("=");
    try {
      const response = yield call(AuthAPI.allUsersStore, storeID[1]);
      yield put(ShopActions.listUserSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
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

export function* deleteUser({ payload }) {
  try {
    yield call(AuthAPI.deleteUserShop, payload.id);
    yield put(ShopActions.deleteUserSuccess("Usuário deletado com sucesso"));
    yield call(delay, 2000);
    yield put(ShopActions.deleteUserSuccess(""));
    // List all user
    const idString = payload.history.location.search;
    const storeID = idString.split("=");
    try {
      const response = yield call(AuthAPI.allUsersStore, storeID[1]);
      yield put(ShopActions.listUserSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    yield console.log(err);
    yield put(
      ShopActions.deleteUserFailure(
        "Ocorreu um erro, por favor tente novamente."
      )
    );
  }
}

export function* editUser({ payload }) {
  const {
    profileId,
    userEmail,
    storeCnpj,
    showSalesValues,
    userSelected
  } = payload.user;

  try {
    const response = yield call(AuthAPI.updateUserShop, userSelected, {
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues
    });
    console.log(response);
    yield put(ShopActions.editUserSuccess("Usuário alterado com sucesso."));

    // List all user
    const idString = payload.history.location.search;
    const storeID = idString.split("=");
    try {
      const response = yield call(AuthAPI.allUsersStore, storeID[1]);
      yield put(ShopActions.listUserSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }

    yield call(delay, 2000);
    yield put(ShopActions.editUserSuccess(""));
  } catch (err) {
    console.log(err);
    yield put(ShopActions.editUserFailure("Dados incorretos ou faltantes."));
  }
}

export function* watchAddUser() {
  yield takeLatest(ShopTypes.ADD_USER_REQUEST, addUser);
}

export function* watchListUser() {
  yield takeLatest(ShopTypes.LIST_USER_REQUEST, listUser);
}

export function* watchDeleteUser() {
  yield takeLatest(ShopTypes.DELETE_USER_REQUEST, deleteUser);
}

export function* watchEditUser() {
  yield takeLatest(ShopTypes.EDIT_USER_REQUEST, editUser);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddUser),
    fork(watchListUser),
    fork(watchDeleteUser),
    fork(watchEditUser)
  ]);
}
