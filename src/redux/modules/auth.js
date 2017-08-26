import {call, put, takeLatest, all} from 'redux-saga/effects';
import {User, Message} from 'redux/models';
import {UserUtil} from 'redux/models/user';
import * as storage from 'helpers/storage';
import {firebaseAuth, FirebaseList} from 'helpers/firebase';

const LOGIN = 'barry/auth/LOGIN';
const LOGIN_SUCCESS = 'barry/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'barry/auth/LOGIN_FAIL';
const SIGNOUT = 'barry/auth/SIGNOUT';
const SIGNOUT_SUCCESS = 'barry/auth/SIGNOUT_SUCCESS';
const SIGNOUT_FAIL = 'barry/auth/SIGNOUT_FAIL';
const AUTH_USER = 'barry/auth/AUTH_USER';
const AUTH_USER_SUCCESS =  'barry/auth/AUTH_USER_SUCCESS';
const AUTH_USER_FAIL =  'barry/auth/AUTH_USER_FAIL';

const initialState = {
  user: new User(),
  message: new Message()
};

const authList = new FirebaseList("users");

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return {
        user: new User({
          ...action.user,
          isLogging: true
        }),
        message: state.message
      };
    case LOGIN_FAIL:
      return {
        user: new User(),
        message: state.message.set("error", action.error)
      };
    case SIGNOUT:
      return state;
    case SIGNOUT_SUCCESS:
      return {
        user: new User(),
        message: state.message
      }
    case SIGNOUT_FAIL:
      return {
        user: state.user,
        message: state.message.set("error", action.error)
      }
    case AUTH_USER:
      return {
        user: new User({
          ...state.user,
          isLogging: true
        }),
        message: state.message
      };
    case AUTH_USER_SUCCESS:
      return {
        user: new User({
          ...action.user,
          isLogging: false
        }),
        message: state.message
      }
    case AUTH_USER_FAIL:
      return {
        user: new User(),
        message: state.message.set("error", action.error)
      }
    default:
      return state;
  }
};

export function login(request) {
  return {
    type: LOGIN,
    payload: request
  };
};

export function signout() {
  return {
    type: SIGNOUT
  };
}

export function authUser() {
  return {
    type: AUTH_USER,
  };
}

function *hundleLogin(action) {
  console.log("hundle login called");
  try {
    const provider = action.payload.provider;

    let auth = firebaseAuth.currentUser;
    if(!auth) {
      auth = yield call([firebaseAuth, firebaseAuth.signInWithPopup], provider);
    }
    const user = UserUtil.fromAuth(auth);

    yield call([authList, authList.update], user.uid, user);
    yield put({type: LOGIN_SUCCESS, user: user});
   } catch (e) {
     console.log(e);
     yield put({type: LOGIN_FAIL, error: e.message});
   }
};

function *hundleSignout(action) {
  console.log("hundle signout called");
  try {
    yield call([firebaseAuth, firebaseAuth.signOut]);
    yield put({type: SIGNOUT_SUCCESS});
  } catch(e) {
    console.log(e);
    yield put({type: SIGNOUT_FAIL, error: e.message});
  }
}

function *hundleAuthUser(action) {
  console.log("hundle auth user called");
  try {
    const auth = firebaseAuth.currentUser;
    if(!auth) {
      yield put({type: AUTH_USER_FAIL, error: "failed_auth_user"});
      return
    }
    const user = UserUtil.fromAuth(auth);
    yield put({type: AUTH_USER_SUCCESS, user: user});
  } catch(e) {
    console.log(e);
    yield put({type: AUTH_USER_FAIL, error: e.message});
  }
}

export function *authSagas() {
  yield all([
    takeLatest(LOGIN, hundleLogin),
    takeLatest(SIGNOUT, hundleSignout),
    takeLatest(AUTH_USER, hundleAuthUser)
  ]);
}
