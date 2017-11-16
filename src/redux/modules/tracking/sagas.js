import { call, put, take, cancelled, cancel, fork } from "redux-saga/effects";
import { eventChannel, buffers } from "redux-saga";
import { FirebaseList } from "helpers/firebase";
import { DateFactory } from "helpers/date";
import actions from "./actions";
import { isMove } from "helpers/distance";
import types from "./types";
import { List } from "immutable";
import { Coordinate } from "redux/models";

const firebaseList = new FirebaseList();
let lastCoordinate = null;

export function initTracking(user) {
  console.log(user);
  if (!firebaseList.path) {
    firebaseList.path = ["users", user.uid].join("/");
  }
}

function* write(context, method, ...params) {
  try {
    yield call([context, method], ...params);
  } catch (e) {
    console.log(e);
    yield put(actions.failTracking(new Error("TRACKING_ERROR")));
  }
}
const pushData = write.bind(null, firebaseList, firebaseList.push);
const updateData = write.bind(null, firebaseList, firebaseList.update);

function* getCurrentCoordinates() {
  try {
    const path = `locations/${DateFactory.today()}`;
    const locations = yield call([firebaseList, firebaseList.get], path);
    if (locations) {
      const coordinates = Object.values(locations);
      yield put(actions.getCurrentCoordinates({ coordinates }));

      if (!lastCoordinate) {
        lastCoordinate = List(coordinates).last();
      }
    }
  } catch (e) {
    console.log(e);
    yield put(actions.handleStopTracking(new Error("TRACKING_ERROR")));
  }
}

function subscribeTracking(buffer) {
  return eventChannel(emitter => {
    const id = navigator.geolocation.watchPosition(
      position => {
        console.log("subscribe watch position", position);
        const coords = new Coordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }).toJS();
        emitter(actions.pushCoordinate({ coordinate: coords }));
      },
      error => {
        emitter(actions.failTracking(new Error("TRACKING_ERROR")));
      }
    );
    return () => {
      console.log("unsubscribe watch position");
      navigator.geolocation.clearWatch(id);
    };
  }, buffer);
}

function* subscribeTrackingSagas() {
  try {
    const buffer = buffers.expanding();
    const channel = yield call(subscribeTracking, buffer);

    while (true) {
      const action = yield take(channel);

      yield put(action);
      if (!action.payload || !action.payload.coordinate) {
        return;
      }
      const currentCoorinate = action.payload.coordinate;

      if (!lastCoordinate) {
        yield fork(updateData, `dates`, { [DateFactory.today()]: true });
        yield fork(pushData, `locations/${DateFactory.today()}`, currentCoorinate);
        lastCoordinate = action.payload.coordinate;
      } else if (isMove(currentCoorinate, lastCoordinate)) {
        yield fork(pushData, `locations/${DateFactory.today()}`, currentCoorinate);
        lastCoordinate = action.payload.coordinate;
      }
    }
  } catch (e) {
    console.log(e);
    yield put(actions.handleStopTracking(new Error("TRACKING_ERROR")));
  } finally {
    if (yield cancelled()) {
      console.log("bg process: watch position is cancelled");
    }
  }
}

export function* triggerTracking() {
  let isInitial = true;
  while (true) {
    const action = yield take(types.HANDLE_START_TRACKING);
    if (isInitial) {
      initTracking(action.payload.user);
      yield fork(getCurrentCoordinates);
    }
    const bgSyncTask = yield fork(subscribeTrackingSagas);
    yield take(types.HANDLE_STOP_TRACKING);
    yield cancel(bgSyncTask);

    isInitial = false;
  }
}
