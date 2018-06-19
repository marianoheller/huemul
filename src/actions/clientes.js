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
