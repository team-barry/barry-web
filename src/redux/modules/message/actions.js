import { createAction } from "redux-actions";
import types from "./types";

const showMessage = createAction(types.SHOW_MESSAGE);
const hideMessage = createAction(types.HIDE_MESSAGE);

export default {
  showMessage,
  hideMessage,
};
