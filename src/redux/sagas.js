import {fork, all} from 'redux-saga/effects';
import {authSagas} from './modules/auth';
import {mapSagas} from './modules/map';

export default function* rootSaga() {
  yield all([
    fork(authSagas),
    fork(mapSagas)
  ]);
};
