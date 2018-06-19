import { createRequestTypes, createAction } from '../utils';


/** *****************************************************************
 * LOGIN
 */
export const LOGIN = createRequestTypes('LOGIN');

export const login = {
  request: loginData => createAction(LOGIN.REQUEST, { loginData }),
  success: () => createAction(LOGIN.SUCCESS),
  failure: errors => createAction(LOGIN.FAILURE, { errors }),
};

/** *****************************************************************
 * LOGIN_CLEAN_ERRORS
 */
export const LOGIN_CLEAN_ERRORS = 'LOGIN_CLEAN_ERRORS';
export const clearErrors = () => createAction(LOGIN_CLEAN_ERRORS);
