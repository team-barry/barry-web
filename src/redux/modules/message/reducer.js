import { handleActions } from "redux-actions";
import actions from "./actions";

const initialState = {
  isShowing: false,
  information: "",
};

export default handleActions(
  {
    [actions.showError]: (state, action) => ({
      ...state,
      isShowing: true,
      information: action.paylaod.information,
    }),
    [actions.hideError]: (state, action) => ({
      ...state,
      isShowing: false,
    }),
  },
  initialState
);
