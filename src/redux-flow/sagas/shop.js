import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { setTokenHeader } from '../../utils/services/http';

import * as AuthAPI from '../../api/auth';
import ActionCreators from '../ducks/shopCreators';

setTokenHeader(localStorage.getItem('token'));

function* listAllUsers(action) {
  const { paramId } = action;
  console.log(action.paramId);
  try {
    const response = yield call(AuthAPI.allUsersStore, paramId);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export function* getUserShop(action) {
  console.log('getUserAuth', action);

  const { storeCnpj, paramId } = action;
  const { profileId, userEmail, showSalesValues } = action.user;
  // Insert a new User Store into the database
  try {
    const response = yield call(AuthAPI.addUserShop, {
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues,
    });
    yield put(ActionCreators.getUserSuccess('Usuário inserido com sucesso.'));
    yield call(delay, 2000);
    yield put(ActionCreators.getUserSuccess(''));

    try {
      // yield call(delay, 3000);
      const response = yield call(AuthAPI.allUsersStore, paramId);
      console.log(response);
      console.log(response.data.content);
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
