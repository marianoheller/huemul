import { createAction, createSetGetTypes } from '../utils';


/** *****************************************************************
 * User login/logout
 */
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = user => createAction(USER_LOGIN, { user });
export const userLogout = () => createAction(USER_LOGOUT);


/** *****************************************************************
 * Version
 */
export const VERSION = createSetGetTypes('VERSION');
export const version = {
  get: () => createAction(VERSION.GET),
  set: buildVersion => createAction(VERSION.SET, { buildVersion }),
};


/** *****************************************************************
 * User info
 */
export const USER_INFO = createSetGetTypes('USER_INFO');
export const userInfo = {
  get: id => createAction(USER_INFO.GET, { jwt: true, id }),
  set: info => createAction(USER_INFO.SET, { info }),
};
