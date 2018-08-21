import { call, fork, put, takeLatest, all } from "redux-saga/effects";
import firebase from "firebase";
import { FirebaseList, storage } from "helpers/firebase";
import isMobile from "helpers/is_mobile";
import { UserUtil } from "redux/models/user";
import actions from "./actions";
import trackingActions from "redux/modules/tracking/actions";
import types from "./types";

const firebaseList = new FirebaseList("users");
const storageIconRef = storage.ref("icons/");

// [NOTE]
// onAuthStateChangedをObserverにしてアクションを発火させれば
// コードの記述量を減らせそう
const getUserStatus = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve(user);
    });
  });
};

const authUserWithSession = provider => {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      if (isMobile.any()) {
        return firebase.auth().signInWithRedirect(provider);
      } else {
        return firebase.auth().signInWithPopup(provider);
      }
    });
};

function* handleLogin(action) {
  console.log("handle login called");
  try {
    const provider = new firebase.auth.GoogleAuthProvider();

    let authedUser = yield call(getUserStatus);
    if (!authedUser) {
      const auth = yield call(authUserWithSession, provider);
      authedUser = auth.user;
    }
    let user = UserUtil.fromAuth(authedUser);

    const userInfoPath = `${user.uid}/info`;
    const userInfo = yield call([firebaseList, firebaseList.get], userInfoPath);

    if (userInfo) {
      user = userInfo;
    } else {
      // 新規登録
      yield call([firebaseList, firebaseList.update], userInfoPath, user);
    }
    yield put(trackingActions.handleStartTracking({ user: user }));
    yield put(actions.login({ user: user }));
  } catch (e) {
    console.log(e);
    yield put(actions.failedLoginFlow(new Error("LOGIN_ERROR")));
  }
}

function* handleSignout(action) {
  console.log("handle signout called");
  try {
    yield call([firebase.auth(), firebase.auth().signOut]);
    yield put(trackingActions.handleStopTracking());
    yield put(actions.signout());
  } catch (e) {
    console.log(e);
    yield put(actions.signout(new Error("SIGNOUT_ERROR")));
  }
}

function* handleEditUser(action) {
  console.log("handle edit user called");
  try {
    const { user, edited_user, icon } = action.payload;

    // upload user icon and get url
    // [NOTE]
    // 画像のアップデートを待ってからURLを取得を待っていて遅い
    // できればアップデートはforkして，refのfullPathを取るだけにしたい
    let icon_url = user.icon_url;
    if (icon) {
      const storageUserIconRef = storageIconRef.child(`${user.uid}/${icon.name}`);
      const snapshot = yield call([storageUserIconRef, storageUserIconRef.put], icon);
      icon_url = yield call([snapshot.ref, snapshot.ref.getDownloadURL]);
    }

    const newUser = user.merge({ ...edited_user, icon_url }).toJS();
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
