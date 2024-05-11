import {
    LOGIN,
    LOGOUT,
    UPDATE_USER
} from './user.actions';

const userReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token
        };
      case 'LOGOUT':
        return {
          ...state,
          user: { email: '', password: '', id: 0, isAdmin: false },
          token: ''
        };
      case 'UPDATE_USER':
        return {
          ...state,
          user: { ...state.user, ...action.payload }
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };
  
  export default userReducer;