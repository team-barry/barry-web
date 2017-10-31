// This middleware dispatch message actions (showErrorMessage or showNotice)
// if an passed action has error statement or message information.

import actions from "redux/modules/message/actions";
import { messangerEvent } from "redux/modules/message/types";

export const messanger = store => next => action => {
  if (Object.values(messangerEvent).some(val => val === action.type)) {
    return next(action);
  }
  if (!action.payload) {
    return next(action);
  }
  if (!action.payload.message || action.payload.message === "") {
    return next(action);
  }

  next(action);
  return store.dispatch(actions.showMessage(action.payload));
};
