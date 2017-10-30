import { call, put, take, cancelled, cancel, fork, all, takeLatest } from "redux-saga/effects";
import { delay } from "redux-saga";
import { Coordinate, Message } from "redux/models";
import { List, Map } from "immutable";
import geoLocation from "helpers/geoLocation";
import { isMove, setNextTime } from "helpers/distance";
import { FirebaseList } from "helpers/firebase";
import { DateFactory } from "helpers/date";

const READY = "barry/map/READY";
const SET_MAPLIST = "barry/map/SET_MAPLIST";
const GET_CURRENT_LOCATION = "barry/map/GET_CURRENT_LOCATION";
const GET_CURRENT_LOCATION_SUCCESS = "barry/map/GET_CURRENT_LOCATION_SUCCESS";
const GET_CURRENT_LOCATION_FAIL = "barry/map/GET_CURRENT_LOCATION_FAIL";
const GET_COORDINATES = "barry/map/GET_COORDINATES";
const GET_COORDINATES_SUCCESS = "barry/map/GET_COORDINATES_SUCCESS";
const GET_COORDINATES_FAIL = "barry/map/GET_COORDINATES_FAIL";
const PUSH_COORDINATE = "barry/map/PUSH_COORDINATE";
const START_UPDATE_POSITION = "barry/map/START_UPDATE_POSITION";
const STOP_UPDATE_POSITION = "barry/map/END_UPDATE_POSITION";
const FIREBASE_FAILED = "barry/map/FIREBASE_FAILED";
const GET_USING_DATES = "barry/map/GET_USING_DATES";
const GET_USING_DATES_SUCCESS = "barry/map/GET_USING_DATES_SUCCESS";
const GET_USING_DATES_FAIL = "barry/map/GET_USING_DATES_FAIL";

const initialState = {
  selectedDay: DateFactory.today(),
  selectedCoordinates: new List(),
  coordinates: new List(),
  message: new Message(),
  ready: false,
  isUpdating: false,
  usingDates: new Map(),
};

const mapList = new FirebaseList();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case READY:
      return {
        ...state,
        ready: true,
      };
    case SET_MAPLIST:
      return state;
    case GET_CURRENT_LOCATION:
      return state;
    case GET_CURRENT_LOCATION_SUCCESS:
      return state;
    case GET_CURRENT_LOCATION_FAIL:
      return {
        ...state,
        message: state.message.set("error", action.error),
      };
    case GET_COORDINATES:
      return {
        ...state,
        selectedDay: action.selectedDay,
      };
    case GET_COORDINATES_SUCCESS:
      // サーバーから位置を取得することが現在地取得よりも早いので
      // 速度向上のためにviewportを設定してしまう
      const coordinatesArray = action.coordinates || [];
      const coordinates = List(
        coordinatesArray.map(v => {
          return new Coordinate(v);
        })
      );
      if (action.selected) {
        return {
          ...state,
          selectedCoordinates: coordinates,
        };
      }
      return {
        ...state,
        coordinates: coordinates,
      };
    case GET_COORDINATES_FAIL:
      return {
        ...state,
        message: state.message.set("error", action.error),
      };
    case PUSH_COORDINATE:
      console.log("push coordinate", action.coordinate);
      return {
        ...state,
        coordinates: state.coordinates.push(new Coordinate(action.coordinate)),
      };
    case START_UPDATE_POSITION:
      return {
        ...state,
        isUpdating: true,
      };
    case STOP_UPDATE_POSITION:
      return {
        ...state,
        isUpdating: false,
      };
    case FIREBASE_FAILED:
      return {
        ...state,
        message: state.message.set("error", action.error),
      };
    case GET_USING_DATES:
      return state;
    case GET_USING_DATES_SUCCESS:
      return {
        ...state,
        usingDates: new Map(action.usingDates),
      };
    case GET_USING_DATES_FAIL:
      return {
        ...state,
        message: state.message.set("error", action.error),
      };
    default:
      return state;
  }
}

export function setMapList(user) {
  mapList.path = ["users", user.uid].join("/");
  return {
    type: SET_MAPLIST,
  };
}

export function getCurrentLocation() {
  return {
    type: GET_CURRENT_LOCATION,
  };
}

export function pushCoordinate(coordinate) {
  return {
    type: PUSH_COORDINATE,
    coordinate: coordinate,
  };
}

export function getSelectedCoordinates(day) {
  return {
    type: GET_COORDINATES,
    selectedDay: day,
  };
}

export function startUpdatePosition() {
  return {
    type: START_UPDATE_POSITION,
  };
}

export function stopUpdatePosition() {
  return {
    type: STOP_UPDATE_POSITION,
  };
}

export function getUsingDates(month) {
  return {
    type: GET_USING_DATES,
    payload: {
      month: month,
    },
  };
}

function* write(context, method, ...params) {
  try {
    console.log("write?", context, params);
    yield call([context, method], ...params);
  } catch (e) {
    console.log(e);
    yield put({ type: FIREBASE_FAILED, error: e.message });
  }
}

const pushLocation = write.bind(null, mapList, mapList.push);
const updateLocationDate = write.bind(null, mapList, mapList.update);

function* handleGetCoordinates(payload) {
  const { selectedDay } = payload;

  if (selectedDay === DateFactory.today()) {
    return;
  }
  try {
    const locations = yield call([mapList, mapList.get], `locations/${selectedDay}`);
    if (locations) {
      const coordinates = Object.values(locations);
      yield put({ type: GET_COORDINATES_SUCCESS, coordinates, selected: true });
      return;
    }
    // ない場合も同様にPutする
    yield put({ type: GET_COORDINATES_SUCCESS, coordinates: null, selected: true });
  } catch (e) {
    console.log(e);
    yield put({ type: GET_COORDINATES_FAIL, error: e.message });
  }
}

function* handleGetUsingDates(payload) {
  const { month } = payload;
  // [TODO]
  // 指定した月からデータのある日を取ってくるように修正する
  try {
    let dates = yield call([mapList, mapList.get], `dates`);
    if (!dates) {
      dates = {};
    }
    yield put({ type: GET_USING_DATES_SUCCESS, usingDates: dates });
  } catch (e) {
    console.log(e);
    yield put({ type: GET_USING_DATES_FAIL, error: e.message });
  }
}

function* bgUpdatePosition() {
  try {
    console.log("bg process: update position");

    let nextTime = null;
    let beforeCoords = null;
    let currentCoords = null;

    const locations = yield call([mapList, mapList.get], `locations/${DateFactory.today()}`);
    if (locations) {
      const coordinates = Object.values(locations);
      yield put({ type: GET_COORDINATES_SUCCESS, coordinates, selected: false });
      yield put({ type: READY });
      beforeCoords = List(coordinates).last();
    }

    yield fork(updateLocationDate, "dates", { [DateFactory.today()]: true });
    while (true) {
      const coords = yield call(geoLocation);
      currentCoords = new Coordinate({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }).toJS();
      const isMovePosition = isMove(beforeCoords, currentCoords);
      if (isMovePosition) {
        yield put({ type: GET_CURRENT_LOCATION_SUCCESS, viewport: currentCoords });
        yield put({ type: PUSH_COORDINATE, coordinate: currentCoords });
        yield fork(pushLocation, `locations/${DateFactory.today()}`, currentCoords);
        yield put({ type: READY });
        beforeCoords = currentCoords;
      }
      nextTime = setNextTime(isMovePosition, nextTime);

      yield delay(nextTime);
    }
  } catch (e) {
    console.log(e);
    yield put({ type: STOP_UPDATE_POSITION });
  } finally {
    if (yield cancelled()) {
      console.log("bg process: update position is cancelled");
    }
  }
}

export function* triggerBgUpdatePosition() {
  while (yield take(START_UPDATE_POSITION)) {
    const bgSyncTask = yield fork(bgUpdatePosition);
    yield take(STOP_UPDATE_POSITION);
    yield cancel(bgSyncTask);
  }
}

export function* mapSagas() {
  yield all([takeLatest(GET_COORDINATES, handleGetCoordinates), takeLatest(GET_USING_DATES, handleGetUsingDates)]);
}
