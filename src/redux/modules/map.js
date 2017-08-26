import {call, put, take, cancelled, cancel, takeLatest, fork, all} from 'redux-saga/effects';
import {delay} from 'redux-saga'
import {Coordinate, ViewPort, Message} from 'redux/models';
import {List} from 'immutable';
import geoLocation from 'helpers/geoLocation';
import {isMove, setNextTime} from 'helpers/distance';
import {FirebaseList} from 'helpers/firebase';

const SET_MAPLIST = 'barry/map/SET_MAPLIST';
const GET_CURRENT_LOCATION = 'barry/map/GET_CURRENT_LOCATION';
const GET_CURRENT_LOCATION_SUCCESS = 'barry/map/GET_CURRENT_LOCATION_SUCCESS';
const GET_CURRENT_LOCATION_FAIL = 'barry/map/GET_CURRENT_LOCATION_FAIL';
const SET_VIEWPORT = 'barry/map/SET_VIEWPORT';
const SET_VIEWPORT_SUCCESS = 'barry/map/SET_VIEWPORT_SUCCESS';
const SET_VIEWPORT_FAIL = 'barry/map/SET_VIEWPORT_FAIL';
const GET_COORDINATES = 'barry/map/GET_COORDINATES';
const GET_COORDINATES_SUCCESS = 'barry/map/GET_COORDINATES_SUCCESS';
const GET_COORDINATES_FAIL = 'barry/map/GET_COORDINATES_FAIL';
const POST_COORDINATE = 'barry/map/POST_COORDINATE';
const POST_COORDINATE_SUCCESS = 'barry/map/POST_COORDINATE_SUCCESS';
const POST_COORDINATE_FAIL = 'barry/map/POST_COORDINATE_FAIL';
const START_UPDATE_POSITION = 'barry/map/START_UPDATE_POSITION';
const STOP_UPDATE_POSITION = 'barry/map/END_UPDATE_POSITION';
const FIREBASE_FAILED = 'barry/map/FIREBASE_FAILED';

const initialState = {
  coordinates: new List(),
  viewport: new ViewPort(),
  message: new Message(),
  isUpdating: false
};

const mapList = new FirebaseList();

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case SET_MAPLIST:
      return state;
    case GET_CURRENT_LOCATION:
      return state;
    case GET_CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        viewport: new ViewPort(action.viewport)
      };
    case GET_CURRENT_LOCATION_FAIL:
      return state;
    case SET_VIEWPORT:
      return state;
    case SET_VIEWPORT_SUCCESS:
      return {
        ...state,
        viewport: new ViewPort(action.viewport)
      };
    case SET_VIEWPORT_FAIL:
      return state;
    case GET_COORDINATES:
      return state;
    case GET_COORDINATES_SUCCESS:
      console.log(action.coordinates);
      const coordinates = List(action.coordinates.map((v) => {
        return new Coordinate(v);
      }));
      console.log(coordinates);
      return {
        ...state,
        coordinates: coordinates,
      };
    case GET_COORDINATES_FAIL:
      return {
        ...state,
        message: state.message.set("error", action.error)
      };
    case POST_COORDINATE:
      return state;
    case POST_COORDINATE_SUCCESS:
      return {
        ...state,
        coordinates: state.coordinates.push(
          new Coordinate(action.coordinate)
        ),
      };
    case POST_COORDINATE_FAIL:
      return {
        ...state,
        message: state.message.set("error", action.error)
      };
    case START_UPDATE_POSITION:
      return {
        ...state,
        isUpdating: true
      };
    case STOP_UPDATE_POSITION:
      return {
        ...state,
        isUpdating: false
      };
    case FIREBASE_FAILED:
      return {
        ...state,
        message: state.message.set("error", action.error)
      };
    default:
      return state;
  }
};

export function setMapList(user) {
  mapList.path = ["users", user.uid, "locations"].join("/");
  return {
    type: SET_MAPLIST
  };
}

export function setViewPort() {
  return {
    type: SET_VIEWPORT
  };
}

export function getCurrentLocation() {
  return {
    type: GET_CURRENT_LOCATION
  };
}

export function getCoordinates() {
  return {
    type: GET_COORDINATES
  };
}

export function postCoordinate(payload) {
  return {
    type: POST_COORDINATE,
    payload: payload
  };
}

export function startUpdatePosition() {
  return {
    type: START_UPDATE_POSITION
  };
}

export function stopUpdatePosition() {
  return {
    type: STOP_UPDATE_POSITION,
  };
}

function* write(context, method, ...params) {
  try {
    yield call([context, method], ...params);
  } catch (e) {
    console.log(e);
    yield put({type: FIREBASE_FAILED, error: e.message});
  }
}

const pushLocation = write.bind(null, mapList, mapList.push);
const removeLocation = write.bind(null, mapList, mapList.remove);

function *handleSetViewPort(action) {
  console.log("handle set view port called");
  try {
    const viewport = action.payload;
    yield put({type: SET_VIEWPORT_SUCCESS, viewport: viewport});
  } catch(e) {
    console.log(e);
    yield put({type: SET_VIEWPORT_FAIL, error: e.message});
  }
}

function *handleGetCoordinates(action) {
  console.log("handle get coordinates");
  try {
    console.log(mapList.path);
    const coordinates = yield call([mapList, mapList.get]);
    console.log(coordinates);
    yield put({type: GET_COORDINATES_SUCCESS, coordinates});
  } catch(e) {
    console.log(e);
    yield put({type: GET_COORDINATES_FAIL, error: e.message});
  }
}

function *bgUpdatePosition() {
  try {
    let nextTime = null;
    let beforeCoords = null;
    let currentCoords = null;
    while (true) {
      console.log("bg process: update position")
      const coords = yield call(geoLocation);
      currentCoords = {
        latitude: coords.latitude,
        longitude: coords.longitude
      }
      const isMovePosition = isMove(beforeCoords, currentCoords);
      if(isMovePosition){
        yield put({type: GET_CURRENT_LOCATION_SUCCESS, viewport: currentCoords});
        yield fork(pushLocation, currentCoords);

        beforeCoords = currentCoords;
      }
      nextTime = setNextTime(isMovePosition, nextTime);
      console.log(nextTime);

      yield delay(nextTime);
    }
  } catch(e) {
    console.log(e);
    yield put({type: STOP_UPDATE_POSITION});
  } finally {
    if (yield cancelled()) {
      console.log("bg process: update position is cancelled")
    }
  }
}

export function *triggerBgUpdatePosition() {
  while (yield take(START_UPDATE_POSITION)) {
    const bgSyncTask = yield fork(bgUpdatePosition)
    yield take(STOP_UPDATE_POSITION)
    yield cancel(bgSyncTask)
  }
}

export function *mapSagas() {
  yield all([
    takeLatest(SET_VIEWPORT, handleSetViewPort),
    takeLatest(GET_COORDINATES, handleGetCoordinates)
  ]);
}
