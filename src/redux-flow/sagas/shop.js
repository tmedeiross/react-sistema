import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { setTokenHeader } from '../../utils/services/http';

import * as AuthAPI from '../../api/auth';
import ActionCreators from '../ducks/shopCreators';

setTokenHeader(localStorage.getItem('token'));

export function* getUserList(action) {
  console.log('getUserList');
  const { paramId } = action;
  try {
    const response = yield call(AuthAPI.allUsersStore, paramId);
    yield put(ActionCreators.getListSuccess(response.data.content));
  } catch (err) {
    console.log(err);
  }
}

export function* editUserShop(action) {
  console.log('editUserShop');

    // const userId = e.target.id;
    // e.preventDefault();
    // const resetState = {
    //   errors: {},
    //   errorMessage: '',
    //   successMessage: '',
    //   isLoading: true,
    // };
    // this.setState(resetState);
    // const { profileId } = this.state;
    // AuthAPI.updateUserShop(this.state.userSelected, {
    //   profileId,
    //   showSalesValues: false,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     this.handleCloseDialog();
    //     this.setState({ ...resetState, successMessage: 'Usuário alterado com sucesso.' });
    //     setTimeout(() => {
    //       this.setState({
    //         successMessage: '',
    //       });
    //       this.listAllUsers();
    //     }, 3000);
    //   })
    //   .catch((err) => {
    //     this.handleCloseDialog();
    //     console.log(err);
    //     if (err.status === 404) {
    //       this.setState({
    //         errorMessage: 'Usuário não ainda cadastrado.',
    //       });
    //     } else {
    //       this.setState({
    //         errorMessage: 'Dados incorretos ou faltantes.',
    //       });
    //     }
    //   });  
  // const { paramId } = action;
  // try {
  //   const response = yield call(AuthAPI.allUsersStore, paramId);
  //   yield put(ActionCreators.getListSuccess(response.data.content));
  // } catch (err) {
  //   console.log(err);
  // }
}

export function* getUserShop(action) {
  const { storeCnpj, paramId } = action;
  const { profileId, userEmail, showSalesValues } = action.user;
  // Insert a new User Store into the database
  console.log(profileId, userEmail, storeCnpj, showSalesValues);
  try {
    yield call(AuthAPI.addUserShop, {
      profileId,
      userEmail,
      storeCnpj,
      showSalesValues,
    });
    yield put(ActionCreators.getUserSuccess('Usuário inserido com sucesso.'));
    try {
      const response = yield call(AuthAPI.allUsersStore, paramId);
      console.log(response);
      yield put(ActionCreators.getListSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }
    yield call(delay, 1500);
    yield put(ActionCreators.getUserSuccess(''));
    // List all user
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
      console.log(response);
      yield put(ActionCreators.getListSuccess(response.data.content));
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    yield console.log(err);
    yield put(ActionCreators.deleteUserFailure('Ocorreu um erro, por favor tente novamente.'));
  }
}
