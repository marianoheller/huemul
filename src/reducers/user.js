import * as actions from '../actions/user';

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: undefined,
  buildVersion: undefined,
  username: null,
  profile: {},
  roles: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.user.usuarioId,
        token: action.user.token,
      };
    case actions.USER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    case actions.VERSION.SET:
      return {
        ...state,
        buildVersion: action.buildVersion,
      };
    case actions.USER_INFO.SET:
      return {
        ...state,
        username: action.info.nombre,
        profile: { ...action.info.perfil },
        roles: { ...action.info.roles },
      };
    default: return state;
  }
};
