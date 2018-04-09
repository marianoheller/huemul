import { fork, all } from 'redux-saga/effects';
import { watchLoginRequest } from './login';

export default function* Root() {
  yield all([
    fork(watchLoginRequest),
  ]);
}
