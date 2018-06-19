import { createRequestTypes, createAction } from '../utils';

/** *****************************************************************
 * CONTACTOS TODOS
 */
export const CONTACTOS_TODOS = createRequestTypes('CONTACTOS_TODOS');

export const contactosTodos = {
  request: () => createAction(CONTACTOS_TODOS.REQUEST, { jwt: true }),
  success: data => createAction(CONTACTOS_TODOS.SUCCESS, { data }),
  failure: error => createAction(CONTACTOS_TODOS.FAILURE, { error }),
};

/** *****************************************************************
 * UPDATE CONTACTO
 */
export const CONTACTO_UPDATE = createRequestTypes('CONTACTOS_UPDATE');
CONTACTO_UPDATE.CLEAR_ERRORS = 'CONTACTO_UPDATE_CLEAR_ERRORS';

export const contactoUpdate = {
  request: data => createAction(CONTACTO_UPDATE.REQUEST, { jwt: true, data }),
  success: data => createAction(CONTACTO_UPDATE.SUCCESS, { data }),
  failure: error => createAction(CONTACTO_UPDATE.FAILURE, { error }),
};
contactoUpdate.clearErrors = () => createAction(CONTACTO_UPDATE.CLEAR_ERRORS);

/** *****************************************************************
 * DELETE CONTACTO
 */
export const CONTACTO_DELETE = createRequestTypes('CONTACTOS_DELETE');
CONTACTO_DELETE.CLEAR_ERRORS = 'CONTACTO_DELETE_CLEAR_ERRORS';

export const contactoDelete = {
  request: id => createAction(CONTACTO_DELETE.REQUEST, { jwt: true, id }),
  success: () => createAction(CONTACTO_DELETE.SUCCESS),
  failure: error => createAction(CONTACTO_DELETE.FAILURE, { error }),
};
contactoDelete.clearErrors = () => createAction(CONTACTO_DELETE.CLEAR_ERRORS);

/** *****************************************************************
 * NEW CONTACTO
 */
export const CONTACTO_NEW = createRequestTypes('CONTACTOS_NEW');

export const contactoNew = {
  request: data => createAction(CONTACTO_NEW.REQUEST, { jwt: true, data }),
  success: data => createAction(CONTACTO_NEW.SUCCESS, { data }),
  failure: () => createAction(CONTACTO_NEW.FAILURE),
};
