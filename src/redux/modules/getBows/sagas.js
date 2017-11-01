import { call, take, put, takeLatest, all } from "redux-saga/effects";
import { eventChannel, buffers } from "redux-saga";
import { firebaseDb } from "helpers/firebase";
import actions from "./actions";
import types from "./types";
import GeoFire from "geofire";
import Bow from "redux/models/bow";

const geoFire = new GeoFire(firebaseDb.ref("/bows/geofire"));
const geoQuery = geoFire.query({
  center: [0, 0],
  radius: 0,
});

// Use eventChannel patterns
// Ref: https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md
// geoQueryを登録しておいて，イベントが発火するとアクションを発行する
function subscribeBows(buffer) {
  return eventChannel(emitter => {
    geoQuery.on("key_entered", (key, location, distance) => {
      firebaseDb
        .ref("bows/comments")
        .child(key)
        .once("value", bowSnap => {
          const bow = bowSnap.val();
          firebaseDb
            .ref("users")
            .child(bow.uid)
            .once("value", userSnap => {
              const user = userSnap.val();
              emitter(actions.addBow({ bow: Bow.newBowFromDB(bow, user) }));
            });
        });
    });
    geoQuery.on("key_exited", key => emitter(actions.removeBow({ bow_id: key })));
    return () => geoQuery.cancel();
  }, buffer);
}

function* handleGetBows(action) {
  try {
    const { coordinate, radius } = action.payload;
    geoQuery.updateCriteria({
      center: coordinate.getGeoLocationArray(),
      radius: radius || 10.0,
    });
    yield put(actions.getBows());
    return;
  } catch (e) {
    console.log(e);
    yield put(actions.getBows(new Error("GET_BOWS_ERROR")));
  }
}

export function* getBowsSagas() {
  yield all([takeLatest(types.HANDLE_GET_BOWS, handleGetBows)]);
}

export function* subscribeBowsSagas() {
  // [TODO]
  // エラー処理
  const buffer = buffers.expanding();
  const channel = yield call(subscribeBows, buffer);

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
