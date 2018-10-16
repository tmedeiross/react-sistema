import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { Types as ShopTypes } from "./reducer";
import { Creators as ShopActions } from "./reducer";

import * as AuthAPI from "Constants/api";
import { setTokenHeader } from "Util/services/http";

setTokenHeader(localStorage.getItem("token"));

export function* getShop() {
  try {
    const response = yield call(AuthAPI.storeAll);
    yield put(ShopActions.getShopSuccess(response.data.content));
  } catch (err) {
    console.log(err);
  }
}

export function* addShop({ payload }) {
  const {
    cnpj,
    fantasyName,
    socialName,
    phoneNumber,
    email,
    address,
    number,
    complement,
    zipCode,
    neighborhood,
    city,
    state
  } = payload.shop;

  try {
    yield call(AuthAPI.storeNew, {
      cnpj,
      fantasyName,
      socialName,
      phoneNumber,
      email,
      address,
      number,
      complement,
      zipCode,
      neighborhood,
      city,
      state
    });
    yield put(ShopActions.addShopSuccess("Loja incluída com sucesso!"));
  } catch (err) {
    if (err.data.message === "Erro de Validação") {
      yield put(ShopActions.addShopFailure("Dados incorretos ou faltantes."));
    } else if (err.data.message === "Store CNPJ already in use!") {
      yield put(ShopActions.addShopFailure("Este CNPJ já está cadastrado"));
    } else if (err.status === 500) {
      yield put(
        ShopActions.addShopFailure(
          "Houve um problema, por favor, tente novamente."
        )
      );
    } else if (err.status === 422) {
      yield put(ShopActions.addShopFailure("Dados faltantes."));
    } else {
      yield put(ShopActions.addShopFailure(err.data.message));
    }
  }
}

export function* getDetailsStore({ payload }) {
  const idString = payload.history.location.search;
  const storeID = idString.split("=");
  try {
    const response = yield call(AuthAPI.storeGet, storeID[1]);
    yield put(ShopActions.getDetailsShopSuccess(response.data));
  } catch (err) {
    history.push("/app/shops");
  }
}

export function* updateShop({ payload }) {
  const {
    cnpj,
    fantasyName,
    socialName,
    phoneNumber,
    email,
    address,
    number,
    complement,
    zipCode,
    neighborhood,
    city,
    state
  } = payload.shop;

  const idString = payload.history.location.search;
  const storeID = idString.split("=");

  try {
    yield call(AuthAPI.storePut, storeID[1], {
      cnpj,
      fantasyName,
      socialName,
      phoneNumber,
      email,
      address,
      number,
      complement,
      zipCode,
      neighborhood,
      city,
      state
    });
    yield put(ShopActions.updateShopSuccess("Dados atualizados com sucesso!"));
  } catch (err) {
    yield put(ShopActions.updateShopFailure("Dados incorretos ou faltantes."));
  }
}

export function* watchGetShop() {
  yield takeLatest(ShopTypes.GET_REQUEST, getShop);
}

export function* watchAddShop() {
  yield takeLatest(ShopTypes.ADD_SHOP_REQUEST, addShop);
}

export function* watchUpdateShop() {
  yield takeLatest(ShopTypes.UPDATE_SHOP_REQUEST, updateShop);
}

export function* watchGetDetailsShop() {
  yield takeLatest(ShopTypes.GET_DETAILS_SHOP_REQUEST, getDetailsStore);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetShop),
    fork(watchAddShop),
    fork(watchGetShop),
    fork(watchUpdateShop),
    fork(watchGetDetailsShop)
  ]);
}
