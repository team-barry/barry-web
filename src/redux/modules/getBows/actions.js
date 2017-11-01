import { createAction } from "redux-actions";
import types from "./types";

const handleGetBows = createAction(types.HANDLE_GET_BOWS);
const getBows = createAction(types.GET_BOWS);
const addBow = createAction(types.ADD_BOW);
const removeBow = createAction(types.REMOVE_BOW);

export default {
  handleGetBows,
  getBows,
  addBow,
  removeBow,
};
