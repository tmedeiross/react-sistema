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

export function* editUserShop(action) {
  const { storeCnpj, userSelected, paramId } = action;
  const { profileId, userEmail, showSalesValues } = action.user;

  console.log('action.user', action.user);

  try {
    yield call(AuthAPI.updateUserShop, userSelected, {
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues,
    });
    yield put(ActionCreators.getUserSuccess('Usuário alterado com sucesso.'));

    // List all user
    try {
      const response = yield call(AuthAPI.allUsersStore, paramId);
      console.log(response);
      yield put(ActionCreators.getListSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }

    yield call(delay, 2000);
    yield put(ActionCreators.getUserSuccess(''));
  } catch (err) {
    console.log(err);
    yield put(ActionCreators.getUserFailure('Dados incorretos ou faltantes.'));
  }
}

export function* getUserShop(action) {
  console.log(action);
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

    // List all user
    try {
      const response = yield call(AuthAPI.allUsersStore, paramId);
      console.log(response);
      yield put(ActionCreators.getListSuccess(response.data.content));
      yield put((action.user.userEmail = ''));
      yield put((action.user.profileId = ''));
    } catch (err) {
      console.log(err);
    }
    yield call(delay, 2000);
    yield put(ActionCreators.getUserSuccess(''));
  } catch (err) {
    yield console.log(err);
    if (err.status === 404) {
      yield put(ActionCreators.getUserFailure('Usuário já está vinculado a esta loja.'));
    } else {
      yield put(ActionCreators.getUserFailure('Dados incorretos ou faltantes.'));
    }
  }
}

export function* deleteUserShop(event, action) {
  const { paramId } = event;
  try {
    yield call(AuthAPI.deleteUserShop, event.userSelected);
    yield put(ActionCreators.deleteUserSuccess('Usuário deletado com sucesso'));
    // List all user
    try {
      const response = yield call(AuthAPI.allUsersStore, paramId);
      yield put(ActionCreators.getListSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    yield console.log(err);
    yield put(ActionCreators.deleteUserFailure('Ocorreu um erro, por favor tente novamente.'));
  }
}
