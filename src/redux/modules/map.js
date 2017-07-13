import {call, put, takeLatest, all} from 'redux-saga/effects';
import {ViewPort, Message} from 'redux/models';
import geoLocation from 'helpers/geoLocation';

const GET_LOCATIONS = 'barry/map/GET_LOCATIONS';
const GET_LOCATIONS_SUCCESS = 'barry/map/GET_LOCATIONS_SUCCESS';
const GET_LOCATIONS_FAIL = 'barry/map/GET_LOCATIONS_FAIL';
const GET_CURRENT_LOCATION = 'barry/map/GET_CURRENT_LOCATION';
const GET_CURRENT_LOCATION_SUCCESS = 'barry/map/GET_CURRENT_LOCATION_SUCCESS';
const GET_CURRENT_LOCATION_FAIL = 'barry/map/GET_CURRENT_LOCATION_FAIL';
const SET_VIEWPORT = 'barry/map/SET_VIEWPORT';
const SET_VIEWPORT_SUCCESS = 'barry/map/SET_VIEWPORT_SUCCESS';
const SET_VIEWPORT_FAIL = 'barry/map/SET_VIEWPORT_FAIL';

const initialState = {
  viewport: new ViewPort(),
  message: new Message()
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case GET_LOCATIONS:
      return state;
    case GET_LOCATIONS_SUCCESS:
      return state;
    case GET_LOCATIONS_FAIL:
      return state;
    case GET_CURRENT_LOCATION:
      return state;
    case GET_CURRENT_LOCATION_SUCCESS:
      return {
        viewport: new ViewPort(action.viewport),
        message: state.message
      };
    case GET_CURRENT_LOCATION_FAIL:
      return state;
    case SET_VIEWPORT:
      return state;
    case SET_VIEWPORT_SUCCESS:
      return {
        viewport: new ViewPort(action.viewport)
      };
    case SET_VIEWPORT_FAIL:
      return state;
    default:
      return state;
  }
};

export function setViewPort(viewport) {
  return {
    type: SET_VIEWPORT,
    payload: viewport
  };
}

export function getCurrentLocation() {
  return {
    type: GET_CURRENT_LOCATION
  };
}

function *hundleSetViewPort(action) {
  console.log("hundle set view port called");
  try {
    const viewport = action.payload;
    yield put({type: SET_VIEWPORT_SUCCESS, viewport: viewport});
  } catch(e) {
    console.log(e);
    yield put({type: SET_VIEWPORT_FAIL, error: e.message});
  }
}

function *hundleGetCurrentLocation(action) {
  console.log("hundle get current location called");
  try {
    const coords = yield call(geoLocation);
    console.log(coords);
    const viewport = {
      latitude: coords.latitude,
      longitude: coords.longitude
    }
    yield put({type: GET_CURRENT_LOCATION_SUCCESS, viewport: viewport});
  } catch(e) {
    console.log(e);
    yield put({type: GET_CURRENT_LOCATION_FAIL, error: e.message});
  }
}

export function *mapSagas() {
  yield all([
    takeLatest(SET_VIEWPORT, hundleSetViewPort),
    takeLatest(GET_CURRENT_LOCATION, hundleGetCurrentLocation),
  ]);
}
