import { handleActions } from "redux-actions";
import actions from "./actions";
import { Coordinate } from "redux/models";
import { List, Map } from "immutable";
import { DateFactory } from "helpers/date";

const initialState = {
  dates: new Map(),
  selectedDate: DateFactory.today(),
  coordinates: new List(),
};

export default handleActions(
  {
    [actions.handleGetCoordinates]: (state, action) => ({
      ...state,
    }),
    [actions.handleGetUsingDates]: (state, action) => ({
      ...state,
    }),
    [actions.getCoordinates]: (state, action) => {
      const selectedDate = action.payload.selectedDate;
      const coordinatesArray = action.payload.coordinates || [];
      const coordinates = List(
        coordinatesArray.map(v => {
          return new Coordinate(v);
        })
      );
      return {
        ...state,
        selectedDate,
        coordinates,
      };
    },
    [actions.getUsingDates]: (state, action) => ({
      ...state,
      dates: new Map(action.payload.dates),
    }),
  },
  initialState
);
