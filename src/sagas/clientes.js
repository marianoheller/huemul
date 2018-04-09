import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { axios } from '../config';

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


/** *****************************************************************
 * Clientes update
 */
const updateClientesAPICall = (jwt, data) => axios.put('/api/clientes', data, {
  headers: { Authorization: jwt },
});

export function* updateCliente(action) {
  try {
    const payload = yield call(
      updateClientesAPICall,
      action.jwt,
      action.data,
    );
    // User data
    if (payload.data) {
      yield put(actions.clientesUpdate.success(action.data));
    } else {
      throw Error('Erroneous response');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.clientesUpdate.failure(e.message));
  }
}

/** *****************************************************************
 * Clientes delete
 */
const deleteClientesAPICall = (jwt, id) => axios.delete(`/api/clientes/${id}`, {
  headers: { Authorization: jwt },
});

export function* deleteCliente(action) {
  try {
    const payload = yield call(
      deleteClientesAPICall,
      action.jwt,
      action.id,
    );
    if (payload.data) {
      yield put(actions.clientesDelete.success());
    } else {
      throw Error('Erroneous response');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.clientesDelete.failure(e.message));
  }
}

/** *****************************************************************
 * Clientes new
 */
const newClientesAPICall = (jwt, data) => axios.post('/api/clientes', data, {
  headers: { Authorization: jwt },
});

export function* newCliente(action) {
  try {
    const payload = yield call(
      newClientesAPICall,
      action.jwt,
      action.data,
    );
    // User data
    if (payload.data) {
      yield put(actions.clientesNew.success(payload.data));
    } else {
      throw Error('Erroneous response');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.clientesNew.failure(e.message));
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
  yield fork(
    takeEvery,
    actions.CLIENTES_UPDATE.REQUEST,
    updateCliente,
  );
  yield fork(
    takeEvery,
    actions.CLIENTES_DELETE.REQUEST,
    deleteCliente,
  );
  yield fork(
    takeEvery,
    actions.CLIENTES_NEW.REQUEST,
    newCliente,
  );
}
