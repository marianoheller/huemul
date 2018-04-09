import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { axios } from '../config';

import * as userActions from '../actions/user';

//= ============================================
// VERSION

const getBuildVersionToAPI = () => axios.get('/api/gitinfo');

export function* getVersionProcess() {
  try {
    const payload = yield call(getBuildVersionToAPI);
    // User data
    if (payload.data) {
      yield put(userActions.version.set(payload.data.buildVersion));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
  }
}


//= ============================================
// INFO

const getUserInfoToAPI = (jwt, id) => axios.get(`/api/usuarios/${id}`, {
  headers: { Authorization: jwt },
});

export function* getUserInfoProcess(action) {
  try {
    const payload = yield call(
      getUserInfoToAPI,
      action.jwt,
      action.id,
    );
    // User data
    if (payload.data) {
      yield put(userActions.userInfo.set(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
  }
}


export function* watchUserRequests() {
  yield fork(
    takeEvery,
    userActions.VERSION.GET,
    getVersionProcess,
  );
  yield fork(
    takeEvery,
    userActions.USER_INFO.GET,
    getUserInfoProcess,
  );
}
