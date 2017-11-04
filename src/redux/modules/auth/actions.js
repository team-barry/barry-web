import { createAction } from "redux-actions";
import types from "./types";

const handleLogin = createAction(types.HANDLE_LOGIN);
const handleSignout = createAction(types.HANDLE_SIGNOUT);
const login = createAction(types.LOGIN);
const signout = createAction(types.SIGNOUT);

export default {
  handleLogin,
  login,
  handleSignout,
  signout,
};
