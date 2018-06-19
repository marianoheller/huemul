/* eslint-disable no-param-reassign */
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/trabajos';


/** *****************************************************************
 * Trabajos procesos
 */
const getProcesosAPICall = jwt => axios.get('/api/codigosProceso', {
  headers: { Authorization: jwt },
});

export function* getTrabajoProcesos(action) {
  try {
    const payload = yield call(
      getProcesosAPICall,
      action.jwt,
    );
    // User data
    if (payload.data) {
      yield put(actions.trabajoProcesos.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.trabajoProcesos.failure(e.message));
  }
}

/** *****************************************************************
 * Trabajos buscar
 */
const getBuscarAPICall = (jwt, data) => axios.get('/api/trabajos', {
  headers: { Authorization: jwt },
  params: {
    _query: Object.keys(data).reduce((acc, k, i) => {
      acc += `${k}==${data[k]}`;
      if (i !== Object.keys(data).length - 1) acc += '&&';
      return acc;
    }, ''),
  },
});

export function* getBuscarTrabajos(action) {
  try {
    const payload = yield call(
      getBuscarAPICall,
      action.jwt,
      action.data,
    );
    // User data
    if (payload.data) {
      yield put(actions.trabajosBuscar.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.trabajosBuscar.failure(e.message));
  }
}


/** *************************************************************** */
export function* watchTrabajosRequest() {
  yield fork(
    takeEvery,
    actions.TRABAJO_PROCESOS.REQUEST,
    getTrabajoProcesos,
  );
  yield fork(
    takeEvery,
    actions.TRABAJOS_BUSCAR.REQUEST,
    getBuscarTrabajos,
  );
}