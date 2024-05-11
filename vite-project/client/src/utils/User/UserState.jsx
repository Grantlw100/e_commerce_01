// UserState.jsx
import { createContext, useContext, useReducer } from 'react';
import userReducer from './User.Reducer'; // make sure the path is correct

const UserContext = createContext();
const { Provider } = UserContext;

const initialState = {
    user: { email: '', password: '', id: 0, isAdmin: false },
    token: ''
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <Provider value={{ ...state, dispatch }}>
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
