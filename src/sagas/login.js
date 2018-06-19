import { call, put, takeEvery, fork } from 'redux-saga/effects';
import qs from 'qs';
import axios from 'axios';

import * as loginActions from '../actions/login';
import * as userActions from '../actions/user';


const postLoginToAPI = data => axios.post('/api/autenticacion', qs.stringify({
  usuario: data.usuario,
  clave: data.clave,
}));

export function* loginProcess(action) {
  try {
    const payload = yield call(
      postLoginToAPI,
      action.loginData,
    );
    // User data
    yield put(userActions.userLogin(payload.data));
    yield put(loginActions.login.success());
  } catch (e) {
    // Error body {"status":401,"description":null,"message":"Not Authorized"}
    yield put(loginActions.login.failure({
      request: e.message,
    }));
  }
}


export function* watchLoginRequest() {
  yield fork(
    takeEvery,
    loginActions.LOGIN.REQUEST,
    loginProcess,
  );
}
