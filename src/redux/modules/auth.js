import {call, put, takeLatest, all} from 'redux-saga/effects';
import {User, Message} from 'redux/models';
import api from 'helpers/api';

const LOGIN = 'barry/auth/LOGIN';
const LOGIN_SUCCESS = 'barry/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'barry/auth/LOGIN_FAIL';
const SIGNUP = 'barry/auth/SIGNUP';
const SIGNUP_SUCCESS = 'barry/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'barry/auth/SIGNUP_FAIL';

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
        user: new User(action.user),
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
        user: new User(action.user),
        message: state.message
      };
    case SIGNUP_FAIL:
      return {
        user: state.user,
        message: state.message.set("error", action.error)
      };
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
     console.log(e);
     yield put({type: LOGIN_FAIL, error: e.message});
   }
};

function *hundleSignup(action) {
  console.log("hundle signup called");
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
    console.log(e);
    yield put({type: SIGNUP_FAIL, error: e.message});
  }
}

export function *authSagas() {
  yield all([
    takeLatest(LOGIN, hundleLogin),
    takeLatest(SIGNUP, hundleSignup)
  ]);
}
