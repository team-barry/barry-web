import { fork, put, takeLatest, all } from "redux-saga/effects";
import { firebaseDb, FirebaseList } from "helpers/firebase";
import actions from "./actions";
import types from "./types";
import GeoFire from "geofire";
import Bow from "redux/models/bow";

const firebaseList = new FirebaseList("/bows/comments");
const geoFire = new GeoFire(firebaseDb.ref("/bows/geofire"));

function* handleBow(action) {
  const { user, coordinate, comment } = action.payload;
  try {
    const bow = new Bow({
      comment: comment,
      coordinate: coordinate,
      user: user,
    });
    yield fork([firebaseList, firebaseList.set], bow.id, bow.save());
    yield fork([geoFire, geoFire.set], bow.id, bow.getLocationForGeoFire());
    yield put(actions.bow());
    return;
  } catch (e) {
    console.log(e);
    yield put(actions.bow(new Error("BOW_ERROR")));
  }
}

export function* bowSagas() {
  yield all([takeLatest(types.HANDLE_BOW, handleBow)]);
}
