import { handleActions } from "redux-actions";
import actions from "./actions";
import { Coordinate } from "redux/models";
import { List } from "immutable";

const initialState = {
  isReady: false,
  isTracking: false,
  trackedCoordinates: new List(),
};

export default handleActions(
  {
    [actions.handleStartTracking]: (state, action) => ({
      ...state,
      isTracking: true,
    }),
    [actions.handleStopTracking]: (state, action) => ({
      ...state,
      isTracking: false,
    }),
    [actions.getCurrentCoordinates]: (state, action) => {
      const coordinatesArray = action.payload.coordinates || [];
      const coordinates = List(
        coordinatesArray.map(v => {
          return new Coordinate(v);
        })
      );
      return {
        ...state,
        trackedCoordinates: coordinates,
        isReady: true,
      };
    },
    [actions.pushCoordinate]: (state, action) => ({
      ...state,
      trackedCoordinates: state.trackedCoordinates.push(new Coordinate(action.payload.coordinate)),
      isReady: true,
    }),
  },
  initialState
);
