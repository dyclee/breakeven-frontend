import { useDispatch } from 'react-redux';

import MenuItem from '@material-ui/core/MenuItem';
import { logout } from './store/actions/auth';


const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
          dispatch(logout());
    }
    return (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
    )
}

export default LogoutButton;
