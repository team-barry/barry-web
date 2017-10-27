import { createAction } from "redux-actions";
import types from "./types";

const handleStartTracking = createAction(types.HANDLE_START_TRACKING);
const handleStopTracking = createAction(types.HANDLE_STOP_TRACKING);
const failTracking = createAction(types.FAIL_TRACKING);
const getCurrentCoordinates = createAction(types.GET_CURRENT_COORDINATES);
const pushCoordinate = createAction(types.PUSH_COORDINATE);
const ready = createAction(types.READY);

export default {
  handleStartTracking,
  handleStopTracking,
  failTracking,
  getCurrentCoordinates,
  pushCoordinate,
  ready,
};
