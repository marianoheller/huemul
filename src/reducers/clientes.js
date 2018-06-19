import * as actions from '../actions/clientes';
import sampleActivos from '../sample_output/clientesActivos.json';
import sampleTodos from '../sample_output/clientesTodos.json';


const initialState = {
  activos: {
    // data: [],
    data: sampleActivos,
    isFetching: false,
    error: null,
  },
  todos: {
    // data: [],
    data: sampleTodos,
    isFetching: false,
    error: null,
  },
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CLIENTES_ACTIVOS.REQUEST:
      return {
        ...state,
        activos: {
          ...state.activos,
          isFetching: true,
          error: null,
        },
      };
    case actions.CLIENTES_ACTIVOS.FAILURE:
      return {
        ...state,
        activos: {
          ...state.activos,
          isFetching: false,
          error: action.error,
        },
      };
    case actions.CLIENTES_ACTIVOS.SUCCESS:
      return {
        ...state,
        activos: {
          ...state.activos,
          isFetching: false,
          error: null,
          data: action.data,
        },
      };
    case actions.CLIENTES_TODOS.REQUEST:
      return {
        ...state,
        todos: {
          ...state.todos,
          isFetching: true,
          error: null,
        },
      };
    case actions.CLIENTES_TODOS.FAILURE:
      return {
        ...state,
        todos: {
          ...state.todos,
          isFetching: false,
          error: action.error,
        },
      };
    case actions.CLIENTES_TODOS.SUCCESS:
      return {
        ...state,
        todos: {
          ...state.todos,
          isFetching: false,
          error: null,
          data: action.data,
        },
      };
    default: return state;
  }
};
