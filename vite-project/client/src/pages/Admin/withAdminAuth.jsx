import {Navigate} from 'react-router-dom';
import { useUserContext } from '../../utils/User/UserState.jsx';

const withAdminAuth = (Component) => {
    const AdminComponent = (props) => {
        const { user } = useUserContext();
        if (user.isAdmin !== true || !user.id) {
            return <Navigate to="/" />
        }
        return <Component {...props} />
    }
    return AdminComponent;
};

export default withAdminAuth;