import { handleActions } from "redux-actions";
import actions from "./actions";

const initialState = {
  isBowed: false,
  comment: "",
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
      const comment = action.payload.comment || state.comment;
      console.log(`bow!: ${comment}`);
      return {
        ...state,
        isBowing: false,
      };
    },
  },
  initialState
);
