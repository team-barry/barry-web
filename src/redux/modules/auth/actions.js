import { createAction } from "redux-actions";
import types from "./types";

const handleLogin = createAction(types.HANDLE_LOGIN);
const handleSignout = createAction(types.HANDLE_SIGNOUT);
const handleAuth = createAction(types.HANDLE_AUTH);
const login = createAction(types.LOGIN);
const signout = createAction(types.SIGNOUT);
const auth = createAction(types.AUTH);

export default {
  handleLogin,
  login,
  handleSignout,
  signout,
  handleAuth,
  auth,
};

console.log(handleLogin());
console.log(login(new Error("message")));
