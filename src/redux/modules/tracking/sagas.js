import { call, put, take, cancelled, cancel, fork } from "redux-saga/effects";
import { delay } from "redux-saga";
import { FirebaseList } from "helpers/firebase";
import { DateFactory } from "helpers/date";
import actions from "./actions";
import geoLocation from "helpers/geoLocation";
import { isMove, setNextTime } from "helpers/distance";
import types from "./types";
import { Coordinate } from "redux/models";

const firebaseList = new FirebaseList();

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

function* bgStartTracking(payload) {
  if (payload && payload.user) {
    initTracking(payload.user);
  }
  try {
    console.log("bg process: update position");

    let nextTime = null;
    let beforeCoords = null;
    let currentCoords = null;
    let isFirstTracking = true;

    const path = `locations/${DateFactory.today()}`;
    const locations = yield call([firebaseList, firebaseList.get], path);
    if (locations) {
      const coordinates = Object.values(locations);
      yield put(actions.getCurrentCoordinates({ coordinates }));
      beforeCoords = new Coordinate(coordinates[coordinates.length - 1]);
      isFirstTracking = false;
    }
    while (true) {
      const coords = yield call(geoLocation);
      currentCoords = new Coordinate({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }).toJS();
      const isMovePosition = isMove(beforeCoords, currentCoords);
      if (isMovePosition) {
        yield put(actions.pushCoordinate({ coordinate: currentCoords }));
        yield fork(pushData, `locations/${DateFactory.today()}`, currentCoords);
        if (isFirstTracking) {
          yield fork(updateData, `dates`, { [DateFactory.today()]: true });
          isFirstTracking = false;
        }
        beforeCoords = currentCoords;
      }
      nextTime = setNextTime(isMovePosition, nextTime);

      yield delay(nextTime);
    }
  } catch (e) {
    console.log(e);
    yield put(actions.handleStopTracking(new Error("TRACKING_ERROR")));
  } finally {
    if (yield cancelled()) {
      console.log("bg process: update position is cancelled");
    }
  }
}

export function* triggerTracking() {
  while (true) {
    const action = yield take(types.HANDLE_START_TRACKING);
    const bgSyncTask = yield fork(bgStartTracking, action.payload);
    yield take(types.HANDLE_STOP_TRACKING);
    yield cancel(bgSyncTask);
  }
}
