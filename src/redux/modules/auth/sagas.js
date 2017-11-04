import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import { firebaseAuth, FirebaseList } from "helpers/firebase";
import { UserUtil } from "redux/models/user";
import actions from "./actions";
import trackingActions from "redux/modules/tracking/actions";
import types from "./types";

const firebaseList = new FirebaseList("users");

function* handleLogin(action) {
  console.log("handle login called");
  try {
    const provider = action.payload.provider;

    let authedUser = firebaseAuth.currentUser;
    if (!authedUser) {
      const auth = yield call([firebaseAuth, firebaseAuth.signInWithPopup], provider);
      authedUser = auth.user;
    }
    let user = UserUtil.fromAuth(authedUser);

    const userInfoPath = `${user.uid}/info`;
    const userInfo = yield call([firebaseList, firebaseList.get], userInfoPath);
    console.log("userinfo", userInfo);

    if (userInfo) {
      console.log("user has loged in");
      user = userInfo;
    } else {
      // 新規登録
      yield call([firebaseList, firebaseList.update], userInfoPath, user);
    }
    yield put(trackingActions.handleStartTracking({ user: user }));
    yield put(actions.login({ user: user }));
  } catch (e) {
    console.log(e);
    yield put(actions.login(new Error("LOGIN_ERROR")));
  }
}

function* handleSignout(action) {
  console.log("handle signout called");
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put(trackingActions.handleStopTracking());
    yield put(actions.signout());
  } catch (e) {
    console.log(e);
    yield put(actions.signout(new Error("SIGNOUT_ERROR")));
  }
}

function* handleEditUser(action) {
  console.log("handle edit user called");
  console.log(action.payload);
  try {
    const { user, edited_user } = action.payload;
    const newUser = user.merge(edited_user).toJS();
    const userInfoPath = `${user.uid}/info`;
    yield fork([firebaseList, firebaseList.update], userInfoPath, newUser);
    yield put(actions.editUser({ user: newUser }));
  } catch (e) {
    console.log(e);
    yield put(actions.editUser(new Error("EDIT_USER_ERROR")));
  }
}

export function* authSagas() {
  yield all([
    takeLatest(types.HANDLE_LOGIN, handleLogin),
    takeLatest(types.HANDLE_SIGNOUT, handleSignout),
    takeLatest(types.HANDLE_EDIT_USER, handleEditUser),
  ]);
}
