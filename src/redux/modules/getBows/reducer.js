import { handleActions } from "redux-actions";
import { OrderedMap } from "immutable";
import actions from "./actions";

const initialState = {
  bows: new OrderedMap(),
};

export default handleActions(
  {
    [actions.handleGetBows]: (state, action) => ({ ...state }),
    [actions.getBows]: (state, action) => ({ ...state }),
    [actions.addBow]: (state, action) => {
      console.log("addbow reducer");
      console.log(state, action);
      const { bow } = action.payload;
      return {
        ...state,
        bows: state.bows.set(bow.id, bow),
      };
    },
    [actions.removeBow]: (state, action) => {
      const { bow_id } = action.payload;
      return {
        ...state,
        bows: state.bows.delete(bow_id),
      };
    },
  },
  initialState
);
