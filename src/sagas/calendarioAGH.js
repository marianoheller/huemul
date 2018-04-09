import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { axios } from '../config';

import * as actions from '../actions/calendarioAGH';


/**
 * Measure time so the success action dosnt get triggered to fast (bad visuals)
 */
const MINIMUM_TIME_MS = 2000;
const delay = ms => new Promise(res => setTimeout(res, ms));


const getCSACalendarToAPI = jwt => axios.get('/api/externo/planificacion/eventos', {
  headers: { Authorization: jwt },
});

export function* getCSACalendarProcess(action) {
  const startTime = new Date();
  try {
    const payload = yield call(
      getCSACalendarToAPI,
      action.jwt,
    );
    // User data
    if (payload.data) {
      const endTime = new Date();
      const timeDiff = MINIMUM_TIME_MS - (endTime - startTime);
      yield call(delay, timeDiff < 0 ? 0 : timeDiff);
      yield put(actions.CSACalendar.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    const endTime = new Date();
    const timeDiff = MINIMUM_TIME_MS - (endTime - startTime);
    yield call(delay, timeDiff < 0 ? 0 : timeDiff);
    console.log(e);
    yield put(actions.CSACalendar.failure(e.message));
  }
}


export function* watchcalendarioCSARequest() {
  yield fork(
    takeEvery,
    actions.CSA_CALENDAR.REQUEST,
    getCSACalendarProcess,
  );
}
