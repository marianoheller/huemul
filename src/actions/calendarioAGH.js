import { createRequestTypes, createAction } from '../utils';


/** *****************************************************************
 * CSA CALENDAR
 */
export const CSA_CALENDAR = createRequestTypes('CSA_CALENDAR');

export const CSACalendar = {
  request: () => createAction(CSA_CALENDAR.REQUEST, { jwt: true }),
  success: data => createAction(CSA_CALENDAR.SUCCESS, { data }),
  failure: error => createAction(CSA_CALENDAR.FAILURE, { error }),
};

/** *****************************************************************
 * OTROS
 */
export const CSA_SET_FILTER = 'CSA_SET_FILTER';
export const CSASetFilter = filter => createAction(CSA_SET_FILTER, { filter });
