import { call, put, takeEvery, fork } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/contactos';


/** *****************************************************************
 * Contactos todos
 */
const getContactosTodosAPICall = jwt => axios.get('/api/contactos', {
  headers: { Authorization: jwt },
});

export function* getContactosTodos(action) {
  try {
    const payload = yield call(
      getContactosTodosAPICall,
      action.jwt,
    );
    // User data
    if (payload.data) {
      yield put(actions.contactosTodos.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.contactosTodos.failure(e.message));
  }
}

/** *****************************************************************
 * Contacto update
 */
const updateContactoAPICall = (jwt, data) => axios.put('/api/contactos', data, {
  headers: { Authorization: jwt },
});

export function* updateContacto(action) {
  try {
    const payload = yield call(
      updateContactoAPICall,
      action.jwt,
      action.data,
    );
    // User data
    if (payload.data) {
      yield put(actions.contactoUpdate.success(action.data));
    } else {
      throw Error('Erroneous response');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.contactoUpdate.failure(e.message));
  }
}

/** *****************************************************************
 * Contacto delete
 */
const deleteContactoAPICall = (jwt, id) => axios.delete(`/api/contactos/${id}`, {
  headers: { Authorization: jwt },
});

export function* deleteContacto(action) {
  try {
    const payload = yield call(
      deleteContactoAPICall,
      action.jwt,
      action.id,
    );
    if (payload.data) {
      yield put(actions.contactoDelete.success());
    } else {
      throw Error('Erroneous response');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.contactoDelete.failure(e.message));
  }
}

/** *****************************************************************
 * Contacto new
 */
const newContactoAPICall = (jwt, data) => axios.post('/api/contactos', data, {
  headers: { Authorization: jwt },
});

export function* newContacto(action) {
  try {
    const payload = yield call(
      newContactoAPICall,
      action.jwt,
      action.data,
    );
    // User data
    if (payload.data) {
      yield put(actions.contactoNew.success(payload.data));
    } else {
      throw Error('Erroneous response');
    }
  } catch (e) {
    console.log(e);
    yield put(actions.contactoNew.failure(e.message));
  }
}

/** *************************************************************** */
export function* watchContactosRequest() {
  yield fork(
    takeEvery,
    actions.CONTACTOS_TODOS.REQUEST,
    getContactosTodos,
  );
  yield fork(
    takeEvery,
    actions.CONTACTO_UPDATE.REQUEST,
    updateContacto,
  );
  yield fork(
    takeEvery,
    actions.CONTACTO_DELETE.REQUEST,
    deleteContacto,
  );
  yield fork(
    takeEvery,
    actions.CONTACTO_NEW.REQUEST,
    newContacto,
  );
}
