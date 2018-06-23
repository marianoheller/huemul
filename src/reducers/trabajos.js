import * as actions from '../actions/trabajos';


const initialState = {
  trabajos: {
    data: [],
    isFetching: false,
    error: null,
  },
  procesos: {
    data: [],
    isFetching: false,
    error: null,
  },
  nuevo: {
    data: null,
    isFetching: false,
    error: null,
  },
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    // PROCESOS
    case actions.TRABAJO_PROCESOS.REQUEST:
      return {
        ...state,
        procesos: {
          ...state.procesos,
          isFetching: true,
          error: null,
        },
      };
    case actions.TRABAJO_PROCESOS.FAILURE:
      return {
        ...state,
        procesos: {
          ...state.procesos,
          isFetching: false,
          error: action.error,
        },
      };
    case actions.TRABAJO_PROCESOS.SUCCESS:
      return {
        ...state,
        procesos: {
          isFetching: false,
          error: null,
          data: action.data,
        },
      };

    // TRABAJOS
    case actions.TRABAJOS_BUSCAR.REQUEST:
      return {
        ...state,
        trabajos: {
          ...state.trabajos,
          isFetching: true,
          error: null,
        },
      };
    case actions.TRABAJOS_BUSCAR.FAILURE:
      return {
        ...state,
        trabajos: {
          ...state.trabajos,
          isFetching: false,
          error: action.errors,
        },
      };
    case actions.TRABAJOS_BUSCAR.SUCCESS:
      return {
        ...state,
        trabajos: {
          isFetching: false,
          erros: null,
          data: action.data,
        },
      };
    // TRABAJO NUEVO
    case actions.TRABAJO_NUEVO.REQUEST:
      return {
        ...state,
        nuevo: {
          ...state.nuevo,
          isFetching: true,
          error: null,
        },
      };
    case actions.TRABAJO_NUEVO.FAILURE:
      return {
        ...state,
        nuevo: {
          ...state.nuevo,
          isFetching: false,
          error: action.error,
        },
      };
    case actions.TRABAJO_NUEVO.SUCCESS:
      return {
        ...state,
        nuevo: {
          isFetching: false,
          error: null,
          data: action.data,
        },
      };
    default: return state;
  }
};
