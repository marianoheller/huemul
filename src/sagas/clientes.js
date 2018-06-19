import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/clientes';


// ====================================================================
// Clientes todos

const getClientesTodosAPICall = jwt => axios.get('/api/clientes', {
  headers: { Authorization: jwt },
});

export function* getClientesTodos(action) {
  try {
    const payload = yield call(
      getClientesTodosAPICall,
      action.jwt,
    );
    // User data
    if (payload.data) {
      yield put(actions.clientesTodos.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.clientesTodos.failure(e.message));
  }
}


// ====================================================================
// Clientes activos

const getClientesActivosAPICall = jwt => axios.get('/api/clientes', {
  headers: { Authorization: jwt },
});

export function* getClientesActivos(action) {
  try {
    const payload = yield call(
      getClientesActivosAPICall,
      action.jwt,
    );
    // User data
    if (payload.data) {
      yield put(actions.clientesActivos.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.clientesActivos.failure(e.message));
  }
}


// ====================================================================


export function* watchClientesRequest() {
  yield fork(
    takeEvery,
    actions.CLIENTES_TODOS.REQUEST,
    getClientesTodos,
  );
  yield fork(
    takeEvery,
    actions.CLIENTES_ACTIVOS.REQUEST,
    getClientesActivos,
  );
}
