import { createRequestTypes, createAction } from '../utils';


/** *****************************************************************
 * Trabajos todos
 */
export const TRABAJOS_TODOS = createRequestTypes('TRABAJOS_TODOS');

export const trabajosTodos = {
  request: data => createAction(TRABAJOS_TODOS.REQUEST, { jwt: true, data }),
  success: data => createAction(TRABAJOS_TODOS.SUCCESS, { data }),
  failure: error => createAction(TRABAJOS_TODOS.FAILURE, { error }),
};

/** *****************************************************************
 * Generar trabajo nuevo
 */
export const TRABAJO_NUEVO = createRequestTypes('TRABAJO_NUEVO');

export const trabajoNuevo = {
  request: data => createAction(TRABAJO_NUEVO.REQUEST, { jwt: true, data }),
  success: data => createAction(TRABAJO_NUEVO.SUCCESS, { data }),
  failure: error => createAction(TRABAJO_NUEVO.FAILURE, { error }),
};

/** *****************************************************************
 * Eliminar trabajo
 */
export const TRABAJO_DELETE = createRequestTypes('TRABAJO_DELETE');

export const trabajoDelete = {
  request: id => createAction(TRABAJO_DELETE.REQUEST, { jwt: true, id }),
  success: () => createAction(TRABAJO_DELETE.SUCCESS),
  failure: error => createAction(TRABAJO_DELETE.FAILURE, { error }),
};

/** *****************************************************************
 * Get procesos
 */
export const TRABAJO_PROCESOS = createRequestTypes('TRABAJO_PROCESOS');

export const trabajoProcesos = {
  request: () => createAction(TRABAJO_PROCESOS.REQUEST, { jwt: true }),
  success: data => createAction(TRABAJO_PROCESOS.SUCCESS, { data }),
  failure: error => createAction(TRABAJO_PROCESOS.FAILURE, { error }),
};

/** *****************************************************************
 * Buscar trabajos
 */
export const TRABAJOS_BUSCAR = createRequestTypes('TRABAJOS_BUSCAR');

export const trabajosBuscar = {
  request: data => createAction(TRABAJOS_BUSCAR.REQUEST, { jwt: true, data }),
  success: data => createAction(TRABAJOS_BUSCAR.SUCCESS, { data }),
  failure: error => createAction(TRABAJOS_BUSCAR.FAILURE, { error }),
};

