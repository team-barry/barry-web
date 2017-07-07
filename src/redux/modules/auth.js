import {call, put, takeLatest, all} from 'redux-saga/effects';
import User from 'redux/models/user';
import api from 'helpers/api';

const LOGIN = 'barry/auth/LOGIN';
const LOGIN_SUCCESS = 'barry/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'barry/auth/LOGIN_FAIL';
const SIGNUP = 'barry/auth/SIGNUP';
const SIGNUP_SUCCESS = 'barry/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'barry/auth/SIGNUP_FAIL';

export default function reducer(user = new User(), action = {}) {
  switch(action.type) {
    case LOGIN:
      return user.set('loggingIn', true);
    case LOGIN_SUCCESS:
      return user.set('loggingIn', false);
    case LOGIN_FAIL:
      return user.set('loggingIn', false);
    case SIGNUP:
      return user;
    case SIGNUP_SUCCESS:
      return user;
    case SIGNUP_FAIL:
      return user;
    default:
      return user;
  }
};

export function login(request) {
  return {
    type: LOGIN,
    payload: request
  };
};

export function loginSuccess(result) {
  // [TODO]
  // implement login success flow
};

export function loginFail(err) {
  // [TODO]
  // implement login error process
  console.log(err);
};

export function signup(request) {
  return {
    type: SIGNUP,
    payload: request
  };
};

export function signupSuccess(result) {
  // [TODO]
  // implement signup success flow
};

export function signupFail(err) {
  // [TODO]
  // implement signup error process
  console.log(err);
};

function *hundleLogin(action) {
  console.log("hundle login called");
  try {
    const req = {
      endpoint: "login",
      method: 'POST',
      body: action.payload
    }
    const user = yield call(api, req);
    yield put({type: LOGIN_SUCCESS, user: user});
   } catch (e) {
    yield put({type: LOGIN_FAIL, message: e.message});
   }
};

function *hundleSignup(action) {
  console.log("hundle signup called");
  console.log(action.payload);
  try {
    const req = {
      endpoint: "users",
      method: 'POST',
      body: {
        user: action.payload
      }
    };
    const user = yield call(api, req);
    yield put({type: SIGNUP_SUCCESS, user: user});
  } catch(e) {
    yield put({type: SIGNUP_FAIL, message: e.message});
  }
}

export function *authSagas() {
  yield all([
    takeLatest(LOGIN, hundleLogin),
    takeLatest(SIGNUP, hundleSignup)
  ]);
}
