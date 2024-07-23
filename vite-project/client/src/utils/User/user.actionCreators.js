import {
    LOGIN,
    LOGOUT,
    UPDATE_USER,
    DELETE_USER,
    OPEN_USER,
    DARK_MODE,
    LOGIN_ERROR,
    REGISTER_ERROR,
    UPDATE_ERROR,
    DELETE_ERROR,
    CREATE_USER,
    CREATE_ERROR,
    PAGE_CHANGE,
    SESSION_UPDATE,
} from './user.actions';

export const login = (user, token) => ({type: LOGIN, payload: {user, token }});
export const logout = () => ({type: LOGOUT});
export const updateUser = (user) => ({type: UPDATE_USER, payload: user});
export const deleteUser = () => ({type: DELETE_USER});
export const openUser = (user) => ({type: OPEN_USER, payload: user});
export const darkMode = () => ({type: DARK_MODE});
export const loginError = (error) => ({type: LOGIN_ERROR, payload: error});
export const registerError = (error) => ({type: REGISTER_ERROR, payload: error});
export const updateError = (error) => ({type: UPDATE_ERROR, payload: error});
export const deleteError = (error) => ({type: DELETE_ERROR, payload: error});
export const createUser = (user) => ({type: CREATE_USER, payload: user});
export const createError = (error) => ({type: CREATE_ERROR, payload: error});
export const pageChange = (page) => ({type: PAGE_CHANGE, payload: page});
export const sessionUpdate = () => ({type: SESSION_UPDATE});