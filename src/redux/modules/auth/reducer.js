import { handleActions } from "redux-actions";
import actions from "./actions";
import { User } from "redux/models";

const initialState = {
  user: new User(),
};

export default handleActions(
  {
    [actions.handleLogin]: (state, action) => ({
      user: new User({
        logging: true,
      }),
    }),
    [actions.login]: (state, action) => ({
      user: new User({
        ...action.payload.user,
        me: true,
        logging: false,
      }),
    }),
    [actions.handleSignout]: (state, action) => ({
      ...state,
    }),
    [actions.signout]: (state, action) => ({
      user: new User(),
    }),
  },
  initialState
);
