import { createAction } from "redux-actions";
import types from "./types";

const handleGetCoordinates = createAction(types.HANDLE_GET_COORDINATES);
const handleGetUsingDates = createAction(types.HANDLE_GET_USING_DATES);
const getCoordinates = createAction(types.GET_COORDINATES);
const getUsingDates = createAction(types.GET_USING_DATES);

export default {
  handleGetCoordinates,
  handleGetUsingDates,
  getCoordinates,
  getUsingDates,
};
