import { combineReducers } from 'redux';
import login from './login';
import user from './user';

// Uses combineReducers to combine all the reducers
const appReducer = combineReducers({
  login,
  user,
});


const rootReducer = (state, action) => appReducer(state, action);


export default rootReducer;