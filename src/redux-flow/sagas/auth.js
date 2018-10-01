import { call, put } from 'redux-saga/effects';
import history from '../../utils/history';
import { setTokenHeader } from '../../utils/services/http';

import { setToken } from '../../utils/services/auth';
import * as AuthAPI from '../../api/auth';
import { setAuth } from '../reducers/auth/action-creators';
import ActionCreators from '../ducks/authCreators';
import { ROUTE_PREFIX as PREFIX } from '../../config';

setTokenHeader(localStorage.getItem('token'));

export function* getAuth(action) {
  const { username, password } = action;
  // token
  try {
    const response = yield call(AuthAPI.login, { username, password });
    const token = response.data.token;
    setToken(token);
    setAuth(true);
    // getUser
    try {
      const response = yield call(AuthAPI.getUser, username);
      const userData = response.data;
      yield put(ActionCreators.getSuccess(userData));
      // getShop
      try {
        const response = yield call(AuthAPI.getShopUser, userData.id);
        const userStore = !!response.data.content[0];
        yield put(ActionCreators.getShopSuccess(userStore));
        if (userStore === false) {
          yield call(history.push, `${PREFIX}/shops`);
        } else {
          yield call(history.push, `${PREFIX}`);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        yield put(ActionCreators.getFailure(err.data.message));
      } else if (err.data.message === 'Usuário desabilitado') {
        yield put(
          ActionCreators.getFailure('Por favor, consulte seu email para ativar o cadastro.'),
        );
      } else if (err.data.status === 401) {
        yield put(ActionCreators.getFailure('Usuário inexistente ou senha inválida.'));
      }
    }
  } catch (err) {
    console.log(err);
    yield put(ActionCreators.getFailure(err.data.message));
  }
}
