import { createContext, useCallback, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import userInitialState from './user.initialState.js'; // make sure the path is correct
import userReducer from './src/Tools/User.Reducer.js'; // make sure the path is correct
// import { saveUserSession, loadUserSession  } from '../../../../server/utils/State-Cart-Mgmt-Utils/store-manage';
import { pageChange } from './user.actionCreators.js';

const UserContext = createContext();
const { Provider } = UserContext;

const initialState = userInitialState

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const navigate = useNavigate();



    // loading the users last session 
    useEffect(() => {
        // Function to load user session
        const loadSession = async () => {
            const session = await loadUserSession(state.user.id);
            if (session) {
                dispatch({ type: 'UPDATE_USER', payload: session });
            }
        };
    
        // Handle page change
        const handlePageChange = () => {
            dispatch(pageChange(window.location.pathname));
        };
    
        // Check if user is logged in and load session if applicable
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (user && token) {
            dispatch({ type: 'LOGIN', payload: { user, token } });
            loadSession(); // Only load session if user is logged in
        }
    
        // Listen for page changes and update state
        window.addEventListener('popstate', handlePageChange);
    
        return () => {
            // Cleanup the event listener on component unmount
            window.removeEventListener('popstate', handlePageChange);
        };
    }, [dispatch, state.user.id]); // Add state.user.id and dispatch as dependencies
    

    // saving the user session 
    // any changes made to the user context providers state will trigger the saveUserSession function
    // this includes changes to the initial state of the user context provider as well as the store and analytics context providers 
    // in the future considre changing the functionality of the saveUserSession useffect hook to only trigger when the user context provider state changes
    useEffect(() => {
        // Save session when user state changes (like after page change or other actions)
        if (state.user.id !== 0) {
            saveUserSession(state);
        }
    }, [state]); // Still need to watch the state changes
    // need to track session-specific data, like sessionDuration, location, or other user-related fields, 
    // you can include those specific fields in the dependency array instead of the entire user object




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
