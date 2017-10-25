import { call, put, takeLatest, all } from "redux-saga/effects";
import { firebaseAuth, FirebaseList } from "helpers/firebase";
import history from "helpers/history";
import { UserUtil } from "redux/models/user";
import actions from "./actions";
import types from "./types";

const authList = new FirebaseList("users");

function* handleLogin(action) {
  console.log("handle login called");
  try {
    const provider = action.payload.provider;

    let authedUser = firebaseAuth.currentUser;
    if (!authedUser) {
      const auth = yield call([firebaseAuth, firebaseAuth.signInWithPopup], provider);
      authedUser = auth.user;
    }
    const user = UserUtil.fromAuth(authedUser);

    yield call([authList, authList.update], user.uid, user);
    yield put(actions.login({ user: user }));

    history.push("/user");
  } catch (e) {
    console.log(e);
    yield put(actions.login(new Error("LOGIN_ERROR")));
  }
}

function* handleSignout(action) {
  console.log("handle signout called");
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(actions.signout());

    history.push("/");
  } catch (e) {
    console.log(e);
    yield put(actions.signout(new Error("SIGNOUT_ERROR")));
  }
}

function* handleAuth(action) {
  console.log("handle auth user called");
  try {
    const auth = firebaseAuth.currentUser;
    if (!auth) {
      yield put(actions.signout(new Error("AUTH_ERROR")));
      history.push("/");
      return;
    }
    const user = UserUtil.fromAuth(auth);
    yield put(actions.auth({ user: user }));
  } catch (e) {
    console.log(e);
    yield put(actions.auth(new Error("AUTH_ERROR")));
  }
}

export function* authSagas() {
  yield all([
    takeLatest(types.HANDLE_LOGIN, handleLogin),
    takeLatest(types.HANDLE_SIGNOUT, handleSignout),
    takeLatest(types.HANDLE_AUTH, handleAuth),
  ]);
}
