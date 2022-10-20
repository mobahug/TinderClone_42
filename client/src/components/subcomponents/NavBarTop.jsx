import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import axiosApiInstance from '../hooks/axiosPrivate';
import { SocketContext } from '../../context/SocketContext';

const NavBarTop = ({ props }) => {
  const [user, setUser] = useState();
  const { notification, setNotification } = useContext(SocketContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          const response = await axiosApiInstance.get('/notifications/unread');
          setNotification(parseInt(response.data.data.notifications));
        } else return;
      } catch (err) {
        // console.log(err);
      }
    };

    return fetchData;
  }, [axiosApiInstance]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/logout');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {user && (
        <AppBar
          style={{ background: '#f0f0f0' }}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <Toolbar>
            <img src="http://localhost:3001/background.png" alt="logo" width="40" height="40" />
            <Box sx={{ mr: 3 }} />
            <Link
              to="/match"
              style={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                textDecoration: 'none',
                color: 'black',
              }}
            >
              Matcha
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'flex' } }}>
              <Link to="/notifications" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IconButton size="large" aria-label="notifications">
                  <Badge badgeContent={notification} color="error">
                    <Tooltip title="Notifications">
                      <NotificationsIcon label="notification" />
                    </Tooltip>
                  </Badge>
                </IconButton>
              </Link>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IconButton size="large" aria-label="profile">
                  <Tooltip title="Profile">
                    <AccountCircleIcon label="profile" />
                  </Tooltip>
                </IconButton>
              </Link>
              <IconButton
                size="large"
                aria-label="logout"
                style={{ marginBottom: 4 }}
                onClick={logout}
              >
                <Tooltip title="Logout">
                  <LogoutIcon label="logout" style={{ textDecoration: 'none', color: 'inherit' }} />
                </Tooltip>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
};

export default NavBarTop;
