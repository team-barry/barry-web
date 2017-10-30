import { call, put, takeLatest, all } from "redux-saga/effects";
import { FirebaseList } from "helpers/firebase";
import actions from "./actions";
import types from "./types";

const firebaseList = new FirebaseList();

function* handleGetCoordinates(action) {
  const { user, selectedDate } = action.payload;

  try {
    const path = `users/${user.uid}/locations/${selectedDate}`;
    let locations = yield call([firebaseList, firebaseList.get], path);
    if (!locations) {
      locations = [];
    }
    const coordinates = Object.values(locations);
    yield put(
      actions.getCoordinates({
        selectedDate,
        coordinates,
      })
    );
    return;
  } catch (e) {
    console.log(e);
    yield put(actions.getCoordinates(new Error("GET_COORDINATES_ERROR")));
  }
}

function* handleGetUsingDates(action) {
  const { user } = action.payload;
  // [TODO]
  // const { user, month } = payload;
  // 指定した月からデータのある日を取ってくるように修正する
  try {
    const path = `users/${user.uid}/dates`;
    let dates = yield call([firebaseList, firebaseList.get], path);
    if (!dates) {
      dates = {};
    }
    yield put(actions.getUsingDates({ dates: dates }));
  } catch (e) {
    console.log(e);
    yield put(actions.getUsingDates(new Error("GET_USING_DATES_ERROR")));
  }
}

export function* locationSagas() {
  yield all([
    takeLatest(types.HANDLE_GET_COORDINATES, handleGetCoordinates),
    takeLatest(types.HANDLE_GET_USING_DATES, handleGetUsingDates),
  ]);
}
