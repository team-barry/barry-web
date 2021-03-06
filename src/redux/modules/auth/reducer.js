import { handleActions } from "redux-actions";
import actions from "./actions";
import { User } from "redux/models";

const initialState = {
  user: new User(),
  logging_in: false,
  logged_in: false,
  editing: false,
  uid: "",
};

export default handleActions(
  {
    [actions.handleLogin]: (state, action) => ({
      ...state,
      user: new User(),
      logging_in: true,
    }),
    [actions.login]: (state, action) => ({
      ...state,
      user: new User({
        ...action.payload.user,
      }),
      logging_in: false,
      logged_in: true,
      uid: action.payload.user.uid,
    }),
    [actions.handleSignout]: (state, action) => ({
      ...state,
    }),
    [actions.signout]: (state, action) => ({
      ...initialState,
    }),
    [actions.handleEditUser]: (state, action) => ({
      ...state,
      editing: true,
    }),
    [actions.editUser]: (state, action) => ({
      ...state,
      user: new User({
        ...action.payload.user,
      }),
      editing: false,
    }),
    [actions.failedLoginFlow]: (state, action) => ({
      ...initialState,
    }),
  },
  initialState
);
