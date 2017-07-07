import {fork, all} from 'redux-saga/effects';
import {authSagas} from './modules/auth';

export default function* rootSaga() {
  yield all([
    fork(authSagas)
  ]);
};
