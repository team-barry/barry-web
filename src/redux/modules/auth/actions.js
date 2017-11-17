import { createAction } from "redux-actions";
import types from "./types";

const handleLogin = createAction(types.HANDLE_LOGIN);
const login = createAction(types.LOGIN);
const handleSignout = createAction(types.HANDLE_SIGNOUT);
const signout = createAction(types.SIGNOUT);
const handleEditUser = createAction(types.HANDLE_EDIT_USER);
const editUser = createAction(types.EDIT_USER);
const failedLoginFlow = createAction(types.FAILED_LOGIN_FLOW);
const changeOptions = createAction(types.CHANGE_OPTIONS);

export default {
  handleLogin,
  login,
  handleSignout,
  signout,
  handleEditUser,
  editUser,
  failedLoginFlow,
  changeOptions,
};
