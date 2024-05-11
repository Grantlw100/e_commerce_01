import React from 'react';
import { useUserContext } from '../../utils/User/UserState';

export default function Login() {
    const { user, setUser, token, setToken } = useUserContext();

    const handleLogin = () => {
        setUser({ email: 'test@test.com', password: 'password', id: 1, isAdmin: true });
        setToken('12345');
    };
    const handleLogin2 = () => {
        setUser({ email: 'test2@test.com', password: 'password2', id: 2, isAdmin: false });
        setToken('54321');
    }

    return (
        <div>
            <h1>Login</h1>
            <h1>User Profile</h1>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>ID: {user.id}</p>
            <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
            <button onClick={handleLogin}>Log In</button>
            <button onClick={handleLogin2}>Log In 2</button>
        </div>
    );
}
