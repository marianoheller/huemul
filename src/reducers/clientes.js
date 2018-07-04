import * as actions from '../actions/clientes';


const initialState = {
  activos: {
    data: [],
    // data: sampleActivos,
    isFetching: false,
    error: null,
  },
  todos: {
    data: [],
    // data: sampleTodos,
    isFetching: false,
    error: null,
  },
  update: {
    isUpdating: false,
    error: '',
  },
  delete: {
    isDeleting: false,
    error: '',
  },
  isCreating: false,
  error: '',
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

    // CONTACTO UPDATE
    case actions.CLIENTES_UPDATE.REQUEST:
      return {
        ...state,
        update: {
          isUpdating: true,
          error: null,
        },
      };
    case actions.CLIENTES_UPDATE.FAILURE:
      return {
        ...state,
        update: {
          isUpdating: false,
          error: action.error,
        },
      };
    case actions.CLIENTES_UPDATE.SUCCESS:
      return {
        ...state,
        update: {
          isUpdating: false,
          error: null,
        },
        data: state.data.map((cliente) => {
          if (action.data.id !== cliente.id) return cliente;
          return action.data;
        }),
      };
    case actions.CLIENTES_UPDATE.CLEAR_ERRORS:
      return {
        ...state,
        update: {
          ...state.update,
          error: '',
        },
      };

    // CONTACTO DELETE
    case actions.CLIENTES_DELETE.REQUEST:
      return {
        ...state,
        delete: {
          isDeleting: true,
          error: null,
        },
      };
    case actions.CLIENTES_DELETE.SUCCESS:
      return {
        ...state,
        delete: {
          isDeleting: false,
          error: null,
        },
        data: state.data.filter(c => c.id !== action.id),
      };
    case actions.CLIENTES_DELETE.FAILURE:
      return {
        ...state,
        delete: {
          isDeleting: false,
          error: action.error,
        },
      };
    case actions.CLIENTES_DELETE.CLEAR_ERRORS:
      return {
        ...state,
        delete: {
          ...state.delete,
          error: '',
        },
      };

    // CONTACTO NEW
    case actions.CLIENTES_NEW.REQUEST:
      return {
        ...state,
        isCreating: true,
        error: null,
      };
    case actions.CLIENTES_NEW.SUCCESS:
      return {
        ...state,
        isCreating: false,
        error: null,
        data: [
          action.data,
          ...state.data,
        ],
      };
    case actions.CLIENTES_NEW.FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      };
    default: return state;
  }
};
