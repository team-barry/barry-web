// This middleware dispatch message actions (showErrorMessage or showNotice)
// if an passed action has error statement or message information.
// [TODO] implementing notice action.

import actions from "redux/modules/message/actions";

export const messanger = store => next => action => {
  if (!action.payload) {
    return next(action);
  }
  if (!action.payload.message || action.payload.message === "") {
    return next(action);
  }

  next(action);

  console.log("messanger: ", action.payload.message);
  if (action.error) {
    return store.dispatch(actions.showError({ information: action.payload.message }));
  } else {
    return store.dispatch(actions.showNotice({ information: action.payload.message }));
  }
};
