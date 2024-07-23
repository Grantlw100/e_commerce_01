import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import userReducer from './User.Reducer'; // make sure the path is correct
import { saveUserSession, loadUserSession  } from '../../../../server/utils/State-Cart-Mgmt-Utils/store-manage';
import { pageChange } from './user.actionCreators';

const UserContext = createContext();
const { Provider } = UserContext;

const initialState = {
    user: { email: '', password: '', id: 0, isAdmin: false, darkMode: false },
    token: '',
    loading: false, 
    error: null,
    lastVisitedPage: '/',
    sessionCreatedAt: '',
    sessionUpdatedAt: '',
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const navigate = useNavigate();



    // 
    useEffect(() => {
        const fetchSession = async () => {
            const session = await loadUserSession(state.user.id);
            if (session) {
                dispatch({ type: 'UPDATE_USER', payload: session });
            }
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (user && token) {
            dispatch({ type: 'LOGIN', payload: { user, token } });
        }
        fetchSession();
    }, []);

    //
    useEffect(() => {
        if (state.user.id !== 0) {
            saveUserSession(state);
        }
    }, [state]);

    //
    useEffect(() => {
        const handlePageChange = () => {
            dispatch(pageChange(window.location.pathname));
        };

        window.addEventListener('popstate', handlePageChange);
        return () => window.removeEventListener('popstate', handlePageChange);
    }, [dispatch]);




    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, [dispatch]);

    const updateUser = useCallback((user) => {
        dispatch({ type: 'UPDATE_USER', payload: user });
        localStorage.setItem('user', JSON.stringify(user));
    }, [dispatch]);

    const deleteUser = useCallback(() => {
        dispatch({ type: 'DELETE_USER' });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, [dispatch]);

    const darkMode = useCallback(() => {
        dispatch({ type: 'DARK_MODE' });
    }, [dispatch]);

    const openUser = useCallback((user) => {
        dispatch({ type: 'OPEN_USER', payload: user });
        navigate('/user');
    }, [dispatch, navigate]);




    return (
        <Provider value={{ ...state, logout, updateUser, deleteUser, darkMode, openUser }}>
            {children}
        </Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUserContext };
