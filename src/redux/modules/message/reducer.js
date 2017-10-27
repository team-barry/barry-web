import { handleActions } from "redux-actions";
import actions from "./actions";

const initialState = {
  isShowing: false,
  isError: false,
  message: "",
};

export default handleActions(
  {
    [actions.showMessage]: (state, action) => ({
      ...state,
      isShowing: true,
      isError: action.error,
      message: action.payload.message,
    }),
    [actions.hideMessage]: (state, action) => ({
      ...state,
      isShowing: false,
    }),
  },
  initialState
);
