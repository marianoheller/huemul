import { createRequestTypes, createAction } from '../utils';


/** *****************************************************************
 * PLANIF CALENDAR
 */
export const PLANIF_CALENDAR = createRequestTypes('PLANIF_CALENDAR');

export const PlanifCalendar = {
  request: () => createAction(PLANIF_CALENDAR.REQUEST, { jwt: true }),
  success: data => createAction(PLANIF_CALENDAR.SUCCESS, { data }),
  failure: error => createAction(PLANIF_CALENDAR.FAILURE, { error }),
};
