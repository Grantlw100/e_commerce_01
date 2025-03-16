import React from 'react';
import CreateUserForm from '../../components/createUserForm/index.jsx';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }
    
    return (
        <div>
        <h1>Sign Up</h1>
        <CreateUserForm />
        <button onClick={() => handleNavigation('/login')}>Login</button>
        </div>
    );
}
