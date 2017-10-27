import { createAction } from "redux-actions";
import types from "./types";

const showError = createAction(types.SHOW_ERROR);
const hideError = createAction(types.HIDE_ERROR);
const showNotice = createAction(types.SHOW_NOTICE);
const hideNotice = createAction(types.HIDE_NOTICE);

export default {
  showError,
  hideError,
  showNotice,
  hideNotice,
};
