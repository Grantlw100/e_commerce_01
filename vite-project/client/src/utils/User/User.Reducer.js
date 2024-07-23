import {
    LOGIN,
    LOGOUT,
    UPDATE_USER,
    DELETE_USER,
    OPEN_USER,
    LOGIN_ERROR,
    REGISTER_ERROR,
    UPDATE_ERROR,
    DELETE_ERROR,
    CREATE_USER,
    CREATE_ERROR,
    DARK_MODE,
    PAGE_CHANGE
} from './user.actions';

const userReducer = (state, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          loading: false,
          error: null
        };
      case LOGOUT:
        return {
          ...state,
          user: { email: '', password: '', id: 0, isAdmin: false },
          token: '',
          lastVisitedPage: '/',
          sessionCreatedAt: '',
          sessionUpdatedAt: ''
        };
      case UPDATE_USER:
        return {
          ...state,
          user: { ...state.user, ...action.payload },
          sessionUpdatedAt: new Date().toISOString()
        };
      case DELETE_USER:
        return {
          ...state,
          user: { email: '', password: '', id: 0, isAdmin: false },
          token: '',
          lastVisitedPage: '/',
          sessionCreatedAt: '',
          sessionUpdatedAt: ''
        };
      case DARK_MODE:
        return {
          ...state,
          user: { ...state.user, darkMode: !state.user.darkMode },
          sessionUpdatedAt: new Date().toISOString()
        };
      case OPEN_USER:
        return {
          ...state,
          user: action.payload,
          sessionUpdatedAt: new Date().toISOString()
        };
      case LOGIN_ERROR:
        return {
          ...state,
          loginError: action.payload
        };
      case REGISTER_ERROR:
        return {
          ...state,
          registerError: action.payload
        };
      case UPDATE_ERROR:
        return {
          ...state,
          updateError: action.payload
        };
      case DELETE_ERROR:
        return {
          ...state,
          deleteError: action.payload
        };
        case CREATE_ERROR:
          return {
            ...state,
            createError: action.payload
          };
      case CREATE_USER:
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
          sessionCreatedAt: new Date().toISOString(),
          sessionUpdatedAt: new Date().toISOString()
        };
        case PAGE_CHANGE:
          return {
            ...state,
            lastVisitedPage: action.payload,
            sessionUpdatedAt: new Date().toISOString()
          };
        case SESSION_UPDATE:
          return {
            ...state,
            sessionUpdatedAt: new Date().toISOString()
          };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
  
  export default userReducer;