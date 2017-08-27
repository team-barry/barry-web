import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import history from 'helpers/history';
import sagas from './sagas';
import {reducers} from './reducers';

const routerReduxMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

export default function myStore() {
  const store = createStore(
    combineReducers({
      router: routerReducer,
      ...reducers
    }),
    applyMiddleware(
      routerReduxMiddleware,
      sagaMiddleware
    )
  );
  sagaMiddleware.run(sagas);
  return store;
};
