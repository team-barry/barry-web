import {call, put, takeLatest, all} from 'redux-saga/effects';
import {User, Message} from 'redux/models';
import API from 'helpers/api';
import * as storage from 'helpers/storage';

const LOGIN = 'barry/auth/LOGIN';
const LOGIN_SUCCESS = 'barry/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'barry/auth/LOGIN_FAIL';
const SIGNUP = 'barry/auth/SIGNUP';
const SIGNUP_SUCCESS = 'barry/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'barry/auth/SIGNUP_FAIL';
const AUTH_USER = 'barry/auth/AUTH_USER';
const AUTH_USER_SUCCESS =  'barry/auth/AUTH_USER_SUCCESS';
const AUTH_USER_FAIL =  'barry/auth/AUTH_USER_FAIL';

const initialState = {
  user: new User(),
  message: new Message()
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return {
        user: new User({
          ...action.user,
          is_valid: true
        }),
        message: state.message
      };
    case LOGIN_FAIL:
      return {
        user: state.user,
        message: state.message.set("error", action.error)
      };
    case SIGNUP:
      return state;
    case SIGNUP_SUCCESS:
      return {
        user: new User({
          ...action.user,
          is_valid: true
        }),
        message: state.message
      };
    case SIGNUP_FAIL:
      return {
        user: state.user,
        message: state.message.set("error", action.error)
      };
    case AUTH_USER:
      return state;
    case AUTH_USER_SUCCESS:
      return {
        user: new User({
          ...action.user,
          is_valid: true
        }),
        message: state.message
      }
    case AUTH_USER_FAIL:
      return {
        user: state.user,
        message: state.message
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

export function signup(request) {
  return {
    type: SIGNUP,
    payload: request
  };
};

export function authUser() {
  return {
    type: AUTH_USER,
  };
}

function *hundleLogin(action) {
  console.log("hundle login called");
  try {
    const req = {
      endpoint: "login",
      body: action.payload
    }
    const user = yield call(API.post, req);
    storage.setAuth(user);
    yield put({type: LOGIN_SUCCESS, user: user});
   } catch (e) {
     console.log(e);
     yield put({type: LOGIN_FAIL, error: e.message});
   }
};

function *hundleSignup(action) {
  console.log("hundle signup called");
  try {
    const req = {
      endpoint: "users",
      body: {
        user: action.payload
      }
    };
    const user = yield call(API.post, req);
    storage.setAuth(user);
    yield put({type: SIGNUP_SUCCESS, user: user});
  } catch(e) {
    console.log(e);
    yield put({type: SIGNUP_FAIL, error: e.message});
  }
}

function *hundleAuthUser(action) {
  console.log("hundle auth user called");
  try {
    const req = {
      endpoint: "login",
      auth: storage.getAuth()
    };
    const user = yield call(API.getWithAuth, req);
    
    yield put({type: AUTH_USER_SUCCESS, user: user});
  } catch(e) {
    console.log(e);
    storage.removeAuth();
    yield put({type: AUTH_USER_FAIL, error: e.message});
  }
}

export function *authSagas() {
  yield all([
    takeLatest(LOGIN, hundleLogin),
    takeLatest(SIGNUP, hundleSignup),
    takeLatest(AUTH_USER, hundleAuthUser)
  ]);
}
