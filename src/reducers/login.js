import * as actions from '../actions/login';

const initialState = {
  isFetching: false,
  errors: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.LOGIN.REQUEST:
      return { ...state, isFetching: true, errors: {} };
    case actions.LOGIN.SUCCESS:
      return { ...state, isFetching: false, errors: {} };

    case actions.LOGIN.FAILURE:
      return {
        ...state,
        isFetching: false,
        errors: action.errors,
      };
    case actions.LOGIN_CLEAN_ERRORS:
      return {
        ...state,
        errors: {},
      };

    default: return state;
  }
};
