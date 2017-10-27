import { fork, all } from "redux-saga/effects";
import { authSagas } from "./modules/auth/sagas";
import { locationSagas } from "./modules/location/sagas";
import { triggerTracking } from "./modules/tracking/sagas";

export default function* rootSaga() {
  yield all([fork(authSagas), fork(locationSagas), fork(triggerTracking)]);
}
