import { combineReducers } from 'redux';
import login from './login';
import user from './user';
import calendarioCSA from './calendarioCSA';
import planificador from './planificador';
import clientes from './clientes';
import contactos from './contactos';
import trabajos from './trabajos';

// Uses combineReducers to combine all the reducers
const appReducer = combineReducers({
  login,
  user,
  calendarioCSA,
  planificador,
  clientes,
  contactos,
  trabajos,
});


const rootReducer = (state, action) => appReducer(state, action);


export default rootReducer;
