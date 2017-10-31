import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { firebaseDb, FirebaseList } from "helpers/firebase";
import actions from "./actions";
import types from "./types";
import GeoFire from "geofire";
import { DateFactory } from "helpers/date";

const firebaseList = new FirebaseList("/bows/comments");
const geoFire = new GeoFire(firebaseDb.ref("/bows/geofire"));

function* handleBow(action) {
  const { user, coordinate, comment } = action.payload;
  try {
    const bowPath = "";
    const commentId = yield call([firebaseList, firebaseList.push], bowPath, {
      uid: user.uid,
      comment: comment,
      created_at: DateFactory.now(),
    });
    const coordinateArray = coordinate.getGeoLocationArray();
    console.log(coordinateArray);
    yield call([geoFire, geoFire.set], commentId, coordinateArray);
    yield put(actions.bow({ comment }));
    return;
  } catch (e) {
    console.log(e);
    yield put(actions.bow(new Error("BOW_ERROR")));
  }
}

export function* bowSagas() {
  yield all([takeLatest(types.HANDLE_BOW, handleBow)]);
}
