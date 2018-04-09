import * as actions from '../actions/user';

const initialState = {
  isAuthenticated: false,
  username: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        username: action.user.username,
      };
    case actions.USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default: return state;
  }
};
