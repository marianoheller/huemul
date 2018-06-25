import * as actions from '../actions/trabajos';
import sampleTrabajos from '../sample_output/trabajos.json';


const initialState = {
  buscar: {
    data: sampleTrabajos,
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
        buscar: {
          ...state.buscar,
          isFetching: true,
          error: null,
        },
      };
    case actions.TRABAJOS_BUSCAR.FAILURE:
      return {
        ...state,
        buscar: {
          ...state.buscar,
          isFetching: false,
          error: action.errors,
        },
      };
    case actions.TRABAJOS_BUSCAR.SUCCESS:
      return {
        ...state,
        buscar: {
          ...state.buscar,
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
