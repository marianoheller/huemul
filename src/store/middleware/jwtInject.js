/* eslint-disable no-param-reassign */

export default store => next => (action) => {
  if (action.jwt) {
    action.jwt = `Bearer ${store.getState().user.token}`;
  }
  return next(action);
};
