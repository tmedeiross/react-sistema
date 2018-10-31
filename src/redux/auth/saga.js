import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import jwdDecode from "jwt-decode";

import { Types as AuthTypes } from "./reducer";
import { Creators as AuthActions } from "./reducer";

import {
  defaultStartPath,
  defaultStartDashboard
} from "Constants/defaultValues";
import * as AuthAPI from "Constants/api";
import { setTokenHeader } from "Util/services/http";
import { isAuthenticated, setToken, setUser } from "Util/services/auth";

import swal from "sweetalert";

setTokenHeader(localStorage.getItem("token"));

function* createAccount({ payload }) {
  const { name, email, password } = payload.data;
  const { history } = payload;

  try {
    yield call(AuthAPI.user, {
      name,
      email,
      password
    });
    yield swal(
      "Atenção",
      `Um email de ativação foi enviado para ${email}. Por favor, verifique seu email e clique no link para ativar sua conta.`,
      "success"
    );
    yield put(AuthActions.createAccountSuccess("Conta criada com sucesso!."));
    history.push("/auth/login");
  } catch (err) {
    console.log(err.data.error);
    if (err.status === 404) {
      if (err.data.message === "E-mail already in use!") {
        yield put(
          AuthActions.createAccountFailure("Este email já está em uso.")
        );
      } else {
        yield put(AuthActions.createAccountFailure(err.data.message));
      }
    } else if (err.data.status === 401) {
      yield put(
        AuthActions.createAccountFailure(
          "Usuário inexistente ou senha inválida."
        )
      );
    }
    yield call(delay, 2000);
    yield put(AuthActions.createAccountFailure(""));
  }
}

function* changePassword({ payload }) {
  const { oldPassword, newPassword } = payload.data;

  if (newPassword && oldPassword) {
    try {
      const response = yield call(AuthAPI.changePassword, {
        oldPassword,
        newPassword
      });
      console.log(response);
      yield put(AuthActions.passChangeSuccess("Senha alterada com sucesso!"));
      yield call(delay, 2000);
      yield put(AuthActions.passChangeSuccess(""));
    } catch (err) {
      console.log(err.data.error);
      yield put(AuthActions.passChangeFailure(err.data.error));
      yield call(delay, 2000);
      yield put(AuthActions.passChangeFailure(""));
    }
  } else {
    yield put(AuthActions.passChangeFailure("Campos obrigatórios"));
    yield call(delay, 2000);
    yield put(AuthActions.passChangeFailure(""));
  }
}

function* recoverPassword({ payload }) {
  const { username } = payload.email;
  try {
    yield call(AuthAPI.forgetPassword, username);
    yield put(
      AuthActions.passRecoverSuccess(
        "Senha enviada com sucesso, por favor verifique seu email."
      )
    );
  } catch (err) {
    if (err.status === 404) {
      yield put(AuthActions.passRecoverFailure("Usuário não encontrado."));
    } else {
      yield put(AuthActions.passRecoverFailure(err.message));
    }
  }
}

function* loginWithEmailPassword({ payload }) {
  const { username, password } = payload.user;
  const { history } = payload;

  try {
    const response = yield call(AuthAPI.login, { username, password });
    const token = response.data.token;
    setToken(token);

    const userData = response.data;
    yield put(AuthActions.userSuccess(userData));

    // getUser
    try {
      const response = yield call(AuthAPI.getUser, username);
      const userData = response.data;
      yield put(AuthActions.userSuccess(userData));

      // getShop
      try {
        const response = yield call(AuthAPI.getShopUser, userData.id);
        const existStore = !!response.data.content[0];
        console.log("já tem loja cadastrada? ", existStore);

        yield put(AuthActions.userStore(existStore));

        if (existStore === false) {
          history.push(defaultStartPath);
        } else {
          history.push(defaultStartDashboard);
        }
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
      if (err.status === 404) {
        yield put(AuthActions.userFailure(err.data.message));
      } else if (err.data.message === "Usuário desabilitado") {
        yield put(
          AuthActions.userFailure(
            "Por favor, consulte seu email para ativar o cadastro."
          )
        );
      } else if (err.data.status === 401) {
        yield put(
          AuthActions.userFailure("Usuário inexistente ou senha inválida.")
        );
      }
    }
  } catch (error) {
    yield console.log(error.data.message);
    yield put(AuthActions.userFailure(error.data.message));
  }
}

export function* getUser() {
  const decoded = jwdDecode(localStorage.getItem("token"));
  const emailToken = decoded.sub;

  try {
    const response = yield call(AuthAPI.getUser, emailToken);
    const userData = response.data;
    yield put(AuthActions.getUserSuccess(userData));
    setUser(userData);
  } catch (err) {
    console.log(err);
  }
}

function* updateUser({ payload }) {
  console.log(payload);
  const { email } = payload.data;

  try {
    yield call(AuthAPI.userPut, email, payload.data);
    yield put(AuthActions.updateUserSuccess("Usuário alterado com sucesso!"));
    yield call(delay, 4000);
    yield put(AuthActions.updateUserSuccess(""));
  } catch (err) {
    console.log(err);
    yield put(AuthActions.updateUserSuccess(err.message));
    yield call(delay, 4000);
    yield put(AuthActions.updateUserSuccess(""));
  }
  getUser();
}

export function* watchLoginUser() {
  yield takeLatest(AuthTypes.USER_REQUEST, loginWithEmailPassword);
}

export function* watchPassRecover() {
  yield takeLatest(AuthTypes.PASS_RECOVER_REQUEST, recoverPassword);
}

export function* watchPassChange() {
  yield takeLatest(AuthTypes.PASS_CHANGE_REQUEST, changePassword);
}

export function* watchCreateAccount() {
  yield takeLatest(AuthTypes.CREATE_ACCOUNT_REQUEST, createAccount);
}

export function* watchGetUser() {
  yield takeLatest(AuthTypes.GET_USER_REQUEST, getUser);
}

export function* watchUpdateUser() {
  yield takeLatest(AuthTypes.UPDATE_USER_REQUEST, updateUser);
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchPassRecover),
    fork(watchPassChange),
    fork(watchCreateAccount),
    fork(watchGetUser),
    fork(watchUpdateUser)
  ]);
}
