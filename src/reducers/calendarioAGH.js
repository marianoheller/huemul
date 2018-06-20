import * as actions from '../actions/calendarioAGH';
import csaPayload from '../sample_output/externoCalendarioCSA.json';


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
  // events: [],
  events: parseEvents(csaPayload),
  isFetching: false,
  error: null,
  filter: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.CSA_CALENDAR.REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case actions.CSA_CALENDAR.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case actions.CSA_CALENDAR.SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        events: parseEvents(action.data),
      };
    case actions.CSA_SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    default: return state;
  }
};
