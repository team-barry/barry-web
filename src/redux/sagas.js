import {fork, all} from 'redux-saga/effects';
import {authSagas} from './modules/auth';
import {mapSagas} from './modules/map';
import {placeSagas} from './modules/place';

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(mapSagas),
    fork(placeSagas)
  ]);
};
