/* eslint-disable no-param-reassign */
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { axios } from '../config';

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

const searchFieldMap = {
  numero: 'numero.numero',
  nombre: 'nombre.nombre',
  ot: 'ot.ot',
  cliente: 'cliente.cliente',
  contacto: 'contacto.contacto',
};

const getBuscarAPICall = (jwt, data) => axios.get('/api/trabajos', {
  headers: { Authorization: jwt },
  params: {
    _query: Object.keys(data).reduce((acc, k, i) => {
      acc += `${searchFieldMap[k]}==${data[k]}`;
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

/** *****************************************************************
 * Trabajos generar
 */
const postGenerarAPICall = (jwt, data) => axios.post('/api/trabajos', data, {
  headers: { Authorization: jwt },
});

export function* generarTrabajoProcess(action) {
  try {
    const payload = yield call(
      postGenerarAPICall,
      action.jwt,
      action.data,
    );
    // User data
    if (payload.data) {
      yield put(actions.trabajoNuevo.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.trabajoNuevo.failure(e.message));
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
  yield fork(
    takeEvery,
    actions.TRABAJO_NUEVO.REQUEST,
    generarTrabajoProcess,
  );
}
