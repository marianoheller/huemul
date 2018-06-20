import { fork, all } from 'redux-saga/effects';
import { watchLoginRequest } from './login';
import { watchUserRequests } from './user';
import { watchcalendarioCSARequest } from './calendarioAGH';
import { watchCalendarioPlanifRequest } from './planificador';
import { watchClientesRequest } from './clientes';
import { watchContactosRequest } from './contactos';
import { watchTrabajosRequest } from './trabajos';

export default function* Root() {
  yield all([
    fork(watchLoginRequest),
    fork(watchUserRequests),
    fork(watchcalendarioCSARequest),
    fork(watchCalendarioPlanifRequest),
    fork(watchClientesRequest),
    fork(watchContactosRequest),
    fork(watchTrabajosRequest),
  ]);
}
