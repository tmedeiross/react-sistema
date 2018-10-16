import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import shopsSagas from "./shops/saga";
import shopUserSagas from "./shop-user/saga";

export default function* rootSaga(getState) {
  yield all([authSagas(), shopsSagas(), shopUserSagas()]);
}
