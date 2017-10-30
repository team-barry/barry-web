import { call, put, takeLatest, all } from "redux-saga/effects";
import { FirebaseList } from "helpers/firebase";
import actions from "./actions";
import types from "./types";

const firebaseList = new FirebaseList();

function* handleBow(action) {
  const { user, coordinate, comment } = action.payload;
  try {
    // const path = `comment/`;
    // yield call([firebaseList, firebaseList.push], path, {
    //   comment,
    // });
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
