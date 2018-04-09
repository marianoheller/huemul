import * as actions from '../actions/login';

const initialState = {
  isFetching: false,
  pause: false,
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return { ...state, isFetching: true, errors: [] };
    case actions.LOGIN_SUCCESS:
      return { ...state, isFetching: false, errors: [] };

    case actions.LOGIN_FAILED:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
        pause: true,
      };

    default: return state;
  }
};
