import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { setTokenHeader } from '../../utils/services/http';

import * as AuthAPI from '../../api/auth';
import ActionCreators from '../ducks/shopCreators';

setTokenHeader(localStorage.getItem('token'));

export function* getUserList(action) {
  const { paramId } = action;
  try {
    const response = yield call(AuthAPI.allUsersStore, paramId);
    yield put(ActionCreators.getListSuccess(response.data.content));
  } catch (err) {
    console.log(err);
  }
}

export function* getUserShop(action) {
  const { storeCnpj, paramId } = action;
  const { profileId, userEmail, showSalesValues } = action.user;
  // Insert a new User Store into the database
  try {
    yield call(AuthAPI.addUserShop, {
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues,
    });
    yield put(ActionCreators.getUserSuccess('Usuário inserido com sucesso.'));
    yield call(delay, 1500);
    yield put(ActionCreators.getUserSuccess(''));
    // List all user
    try {
      const response = yield call(AuthAPI.allUsersStore, paramId);
      console.log(response);
      yield put(ActionCreators.getListSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    yield console.log(err);
    if (err.status === 404) {
      yield put(ActionCreators.getUserFailure('Usuário já está vinculado a esta loja.'));
    } else {
      yield put(ActionCreators.getUserFailure('Dados incorretos ou faltantes.'));
    }
  }
}
