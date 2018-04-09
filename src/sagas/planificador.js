import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { axios } from '../config';

import * as planifActions from '../actions/planificador';


/**
 * Measure time so the success action dosnt get triggered to fast (bad visuals)
 */
const MINIMUM_TIME_MS = 2000;
const delay = ms => new Promise(res => setTimeout(res, ms));


const getPlanifCalendarToAPI = jwt => axios.get('/api/calendario/planificacion', {
  headers: { Authorization: jwt },
});

export function* getPlanifCalendarProcess(action) {
  const startTime = new Date();
  try {
    const payload = yield call(
      getPlanifCalendarToAPI,
      action.jwt,
    );
    // User data
    if (payload.data) {
      const endTime = new Date();
      const timeDiff = MINIMUM_TIME_MS - (endTime - startTime);
      yield call(delay, timeDiff < 0 ? 0 : timeDiff);
      yield put(planifActions.PlanifCalendar.success(payload.data));
    } else {
      throw Error('Payload erroneous, no data');
    }
  } catch (e) {
    const endTime = new Date();
    const timeDiff = MINIMUM_TIME_MS - (endTime - startTime);
    yield call(delay, timeDiff < 0 ? 0 : timeDiff);
    console.log(e);
    yield put(planifActions.PlanifCalendar.failure(e.message));
  }
}


export function* watchCalendarioPlanifRequest() {
  yield fork(
    takeEvery,
    planifActions.PLANIF_CALENDAR.REQUEST,
    getPlanifCalendarProcess,
  );
}
