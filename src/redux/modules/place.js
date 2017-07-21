import {call, put, takeLatest, all} from 'redux-saga/effects';
import {Coordinate, Message} from 'redux/models';
import {List} from 'immutable';
import API from 'helpers/api';
import * as storage from 'helpers/storage';

const GET_COORDINATES = 'barry/map/GET_COORDINATES';
const GET_COORDINATES_SUCCESS = 'barry/map/GET_COORDINATES_SUCCESS';
const GET_COORDINATES_FAIL = 'barry/map/GET_COORDINATES_FAIL';
const POST_COORDINATE = 'barry/map/POST_COORDINATE';
const POST_COORDINATE_SUCCESS = 'barry/map/POST_COORDINATE_SUCCESS';
const POST_COORDINATE_FAIL = 'barry/map/POST_COORDINATE_FAIL';

const initialState = {
  coordinates: new List(),
  message: new Message()
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case GET_COORDINATES:
      return state;
    case GET_COORDINATES_SUCCESS:
      const coordinates = List(action.coordinates.map((v) => {
        return new Coordinate(v);
      }));
      console.log(coordinates);
      return {
        coordinates: coordinates,
        message: state.message
      };
    case GET_COORDINATES_FAIL:
      return {
        coordinates: state.coordinates,
        message: state.message.set("error", action.error)
      };
    case POST_COORDINATE:
      return state;
    case POST_COORDINATE_SUCCESS:
      return {
        coordinates: state.coordinates.push(action.coordinate),
        message: state.message
      };
    case POST_COORDINATE_FAIL:
      return {
        coordinates: state.coordinates,
        message: state.message.set("error", action.error)
      };
    default:
      return state;
  }
};

export function getCoordinates(payload) {
  return {
    type: GET_COORDINATES,
    payload: payload
  };
}

export function postCoordinate(payload) {
  return {
    type: POST_COORDINATE,
    payload: payload
  }
}

function *hundleGetCoordinates(action) {
  console.log("hundle get coordinates");
  try {
    const req = {
      endpoint: "coordinates",
      auth: storage.getAuth()
    };
    const coordinates = yield call(API.getWithAuth, req);
    yield put({type: GET_COORDINATES_SUCCESS, coordinates});
  } catch(e) {
    console.log(e);
    yield put({type: GET_COORDINATES_FAIL, error: e.message});
  }
}

function *hundlePostCoordinate(action) {
  console.log("hundle post coordinate")
  try {
    const coordinate = {
      latitude: action.viewport.latitude,
      longitude: action.viewport.longitude
    };
    const req = {
      endpoint: "coordinates",
      auth: storage.getAuth(),
      coordinates: coordinate
    };
    yield call(API.postWithAuth, req);
    yield put({type: POST_COORDINATE_SUCCESS, coordinate});
  } catch(e) {
    console.log(e);
    yield put({type: POST_COORDINATE_FAIL, error: e.message});
  }
}

export function *placeSagas() {
  yield all([
    takeLatest(GET_COORDINATES, hundleGetCoordinates),
    takeLatest(POST_COORDINATE, hundlePostCoordinate)
  ]);
}
