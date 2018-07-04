import forEach from 'lodash.foreach';
import get from 'lodash.get';
import flatten from 'lodash.flatten';
import reduce from 'lodash.reduce';
import uniqWith from 'lodash.uniqwith';
import isEqual from 'lodash.isequal';


/** *************************************************
 * Styling helpers
 */
export function adjustHexOpacity(color, opacity) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/** *************************************************
 * Action helpers
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const SET = 'SET';
const GET = 'GET';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createSetGetTypes(base) {
  return [SET, GET].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createAction(type, payload = {}) {
  return { type, ...payload };
}

/** *************************************************
 * MISC
 */
export function uniq(a) {
  const prims = { boolean: {}, number: {}, string: {} };
  const objs = [];

  return a.filter((item) => {
    const type = typeof item;
    if (type in prims) {
      prims[type][item] = true;
      return !prims[type].hasOwnProperty(item); // eslint-disable-line
    }
    return objs.indexOf(item) >= 0 ? false : objs.push(item);
  });
}


export function filterAgenda(filter, todos, params) {
  const lFilter = filter.toLowerCase();
  const filtered = reduce(todos, (acc, contacto) => {
    forEach(params, (param, indexParam) => {
      const val = get(contacto, param);
      if (typeof val === 'object') return;
      if (typeof val === 'undefined') return;
      if (typeof val === 'string' && val.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(lFilter)) {
        acc[indexParam].push(contacto);
      }
    });
    return acc;
  }, Array(params.length).fill([]));
  return uniqWith(flatten(filtered), isEqual);
}
