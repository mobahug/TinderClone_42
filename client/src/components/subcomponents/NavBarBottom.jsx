import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import { SocketContext } from '../../context/SocketContext';
import ForumIcon from '@mui/icons-material/Forum';
import Badge from '@mui/material/Badge';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ExploreIcon from '@mui/icons-material/Explore';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axiosApiInstance from '../hooks/axiosPrivate';

export default function FixedBottomNavigation() {
  const [user, setUser] = useState();
  const { message, setMessage } = useContext(SocketContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          const response = await axiosApiInstance.post('/messages/unread');
          // console.log('messages: ' + response.data.data.messages);
          setMessage(parseInt(response.data.data.messages));
        } else return;
      } catch (err) {
        // console.log(err);
      }
    };

    return fetchData;
  }, [axiosApiInstance]);

  return (
    <Box sx={{ pb: 7, marginTop: 10 }}>
      <CssBaseline />
      <Paper
        sx={{ height: 55.5, position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 5 }}
        elevation={3}
      >
        {user && (
          <BottomNavigation>
            <BottomNavigationAction
              component={Link}
              to={'/explore'}
              label="Explore"
              icon={
                <Tooltip title="Explore People">
                  <IconButton>
                    <ExploreIcon />
                  </IconButton>
                </Tooltip>
              }
            />

            <BottomNavigationAction
              component={Link}
              to={'/match'}
              label="Matches"
              icon={
                <Tooltip title="Find Match">
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              }
            />

            <BottomNavigationAction
              component={Link}
              to={'/chat/chatlist'}
              label="Messages"
              icon={
                <Badge badgeContent={message} color="error">
                  <Tooltip title="Conversations">
                    <IconButton>
                      <ForumIcon />
                    </IconButton>
                  </Tooltip>
                </Badge>
              }
            />
          </BottomNavigation>
        )}
        ;
      </Paper>
    </Box>
  );
}
