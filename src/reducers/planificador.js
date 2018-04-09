import * as actions from '../actions/planificador';


const parseEvents = data => data.map(ev => ({
  start: new Date(`${ev.fechaComienzo} ${ev.tiempoComienzo}`),
  end: new Date(`${ev.fechaFin} ${ev.tiempoFin}`),
  title: ev.descripcion,
  allDay: false,
  resource: {
    type: ev.tipoActividad.split('.').pop(),
    fixed: ev.planFijo,
    lastEvent: ev.esUltimoEventoDelTrabajo,
    legajo: ev.legajo,
  },
}));


const initialState = {
  events: [],
  // events: parseEvents(planifPayload.eventos),
  isFetching: false,
  error: null,
};


export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.PLANIF_CALENDAR.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.PLANIF_CALENDAR.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case actions.PLANIF_CALENDAR.SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        events: parseEvents(action.data.eventos),
      };
    default: return state;
  }
};
