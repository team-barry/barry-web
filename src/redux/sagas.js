import { fork, all } from "redux-saga/effects";
import { authSagas } from "./modules/auth/sagas";
import { mapSagas, triggerBgUpdatePosition } from "./modules/map";

export default function* rootSaga() {
  yield all([fork(authSagas), fork(mapSagas), fork(triggerBgUpdatePosition)]);
}
