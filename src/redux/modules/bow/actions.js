import { createAction } from "redux-actions";
import types from "./types";

const handleBow = createAction(types.HANDLE_BOW);
const bow = createAction(types.BOW);

export default {
  handleBow,
  bow,
};
