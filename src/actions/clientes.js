import { createRequestTypes, createAction } from '../utils';


/** *****************************************************************
 * CLIENTES TODOS
 */
export const CLIENTES_TODOS = createRequestTypes('CLIENTES_TODOS');

export const clientesTodos = {
  request: () => createAction(CLIENTES_TODOS.REQUEST, { jwt: true }),
  success: data => createAction(CLIENTES_TODOS.SUCCESS, { data }),
  failure: error => createAction(CLIENTES_TODOS.FAILURE, { error }),
};

/** *****************************************************************
 * CLIENTES ACTIVOS
 */
export const CLIENTES_ACTIVOS = createRequestTypes('CLIENTES_ACTIVOS');

export const clientesActivos = {
  request: () => createAction(CLIENTES_ACTIVOS.REQUEST, { jwt: true }),
  success: data => createAction(CLIENTES_ACTIVOS.SUCCESS, { data }),
  failure: error => createAction(CLIENTES_ACTIVOS.FAILURE, { error }),
};


/** *****************************************************************
 * UPDATE CLIENTE
 */
export const CLIENTES_UPDATE = createRequestTypes('CLIENTES_UPDATE');
CLIENTES_UPDATE.CLEAR_ERRORS = 'CLIENTES_UPDATE_CLEAR_ERRORS';

export const clientesUpdate = {
  request: data => createAction(CLIENTES_UPDATE.REQUEST, { jwt: true, data }),
  success: data => createAction(CLIENTES_UPDATE.SUCCESS, { data }),
  failure: error => createAction(CLIENTES_UPDATE.FAILURE, { error }),
};
clientesUpdate.clearErrors = () => createAction(CLIENTES_UPDATE.CLEAR_ERRORS);


/** *****************************************************************
 * DELETE CLIENTE
 */
export const CLIENTES_DELETE = createRequestTypes('CLIENTES_DELETE');
CLIENTES_DELETE.CLEAR_ERRORS = 'CLIENTES_DELETE_CLEAR_ERRORS';

export const clientesDelete = {
  request: id => createAction(CLIENTES_DELETE.REQUEST, { jwt: true, id }),
  success: () => createAction(CLIENTES_DELETE.SUCCESS),
  failure: error => createAction(CLIENTES_DELETE.FAILURE, { error }),
};
clientesDelete.clearErrors = () => createAction(CLIENTES_DELETE.CLEAR_ERRORS);


/** *****************************************************************
 * NEW CLIENTE
 */
export const CLIENTES_NEW = createRequestTypes('CLIENTES_NEW');

export const clientesNew = {
  request: data => createAction(CLIENTES_NEW.REQUEST, { jwt: true, data }),
  success: data => createAction(CLIENTES_NEW.SUCCESS, { data }),
  failure: () => createAction(CLIENTES_NEW.FAILURE),
};
