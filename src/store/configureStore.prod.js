import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import jwtInject from './middleware/jwtInject';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware, jwtInject),
  );

  sagaMiddleware.run(rootSaga);
  return store;
}
