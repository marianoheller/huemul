import * as actions from '../actions/contactos';


const initialState = {
  data: [],
  // data: sampleTodos,
  isFetching: false,
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
    // CONTACTOS TODOS
    case actions.CONTACTOS_TODOS.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.CONTACTOS_TODOS.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case actions.CONTACTOS_TODOS.SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        data: action.data,
      };

    // CONTACTO UPDATE
    case actions.CONTACTO_UPDATE.REQUEST:
      return {
        ...state,
        update: {
          isUpdating: true,
          error: null,
        },
      };
    case actions.CONTACTO_UPDATE.FAILURE:
      return {
        ...state,
        update: {
          isUpdating: false,
          error: action.error,
        },
      };
    case actions.CONTACTO_UPDATE.SUCCESS:
      return {
        ...state,
        update: {
          isUpdating: false,
          error: null,
        },
        data: state.data.map((contacto) => {
          if (action.data.id !== contacto.id) return contacto;
          return action.data;
        }),
      };
    case actions.CONTACTO_UPDATE.CLEAR_ERRORS:
      return {
        ...state,
        update: {
          ...state.update,
          error: '',
        },
      };

    // CONTACTO DELETE
    case actions.CONTACTO_DELETE.REQUEST:
      return {
        ...state,
        delete: {
          isDeleting: true,
          error: null,
        },
      };
    case actions.CONTACTO_DELETE.SUCCESS:
      return {
        ...state,
        delete: {
          isDeleting: false,
          error: null,
        },
        data: state.data.filter(c => c.id !== action.id),
      };
    case actions.CONTACTO_DELETE.FAILURE:
      return {
        ...state,
        delete: {
          isDeleting: false,
          error: action.error,
        },
      };
    case actions.CONTACTO_DELETE.CLEAR_ERRORS:
      return {
        ...state,
        delete: {
          ...state.delete,
          error: '',
        },
      };

    // CONTACTO NEW
    case actions.CONTACTO_NEW.REQUEST:
      return {
        ...state,
        isCreating: true,
        error: null,
      };
    case actions.CONTACTO_NEW.SUCCESS:
      return {
        ...state,
        isCreating: false,
        error: null,
        data: [
          action.data,
          ...state.data,
        ],
      };
    case actions.CONTACTO_NEW.FAILURE:
      return {
        ...state,
        isCreating: false,
        error: action.error,
      };
    default: return state;
  }
};
