import { handleActions } from "redux-actions";
import actions from "./actions";

const initialState = {
  isBowing: false,
};

export default handleActions(
  {
    [actions.handleBow]: (state, action) => {
      return {
        ...state,
        isBowing: true,
      };
    },
    [actions.bow]: (state, action) => {
      return {
        ...state,
        isBowing: false,
      };
    },
  },
  initialState
);
