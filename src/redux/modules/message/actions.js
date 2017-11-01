import { createAction } from "redux-actions";
import types from "./types";

const showMessage = createAction(types.SHOW_MESSAGE);
const hideMessage = createAction(types.HIDE_MESSAGE);
const createMessage = createAction(types.CREATE_MESSAGE);

export default {
  showMessage,
  hideMessage,
  createMessage,
};
