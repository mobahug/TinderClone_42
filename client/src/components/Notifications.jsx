import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import NavBarTop from './subcomponents/NavBarTop';
import Footer from './subcomponents/Footer';
import NavBarBottom from './subcomponents/NavBarBottom';
import axiosApiInstance from './hooks/axiosPrivate';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { motion } from 'framer-motion';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

const Notifications = (props) => {
  const [notifications, setNotifications] = useState([[]]);
  const [notifUser, setNotifUser] = useState([[]]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          const response = await axiosApiInstance.get('/notifications');
          // console.log(response2.data.data.notifications)
          setNotifications(response.data.data.notifications);
        } else return;
      } catch (err) {
        // console.log(err);
      }
    };
    return fetchData;
  }, [axiosApiInstance]);

  const remove = async () => {
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const response = await axiosApiInstance.post('/notifications/clear');
        setNotifications([]);
      }
    } catch (err) {
      // console.log(err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          await axiosApiInstance.post('/notifications/setread');
        }
      } catch (err) {
        // console.log(err);
      }
    };
    return fetchData;
  }, [axiosApiInstance]);

  return (
    <>
      <NavBarTop />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div style={{ width: '100%' }}>
          <div>
            <Box
              sx={{
                display: 'flex',
                marginTop: 8,
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.paper',
                borderRadius: 1,
                padding: 1,
              }}
            >
              {notifications && notifications[0] && (
                <IconButton onClick={remove} sx={{ p: '5px', m: '5px' }}>
                  <Tooltip title="Clear notifications">
                    <DeleteIcon fontSize="large" />
                  </Tooltip>
                </IconButton>
              )}
              {!notifications ||
                (notifications.length === 0 && (
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh', color: 'lightgrey' }}
                  >
                    <Typography variant="h3" component="h3" align="center">
                      no notifications :(
                    </Typography>
                    ;
                  </Grid>
                ))}
              {notifications &&
                notifications[0]?.length !== 0 &&
                notifications.map((notification, value) => {
                  return (
                    <Item style={{ marginTop: 0.5, width: '100%', maxWidth: 545 }} key={value}>
                      <Link
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        to={'/explore/' + notification.sender_id}
                      >
                        <ListItemIcon sx={{ float: 'left', padding: 'none' }}>
                          <Avatar alt={notification.sender_pic} src={notification.sender_pic} />
                        </ListItemIcon>
                        <Typography
                          style={{ fontSize: 10, marginTop: 0.1, marginLeft: 0, float: 'right' }}
                          noWrap
                        >
                          {notification.formatted_date}
                        </Typography>
                        <div
                          style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}
                        >
                          <Typography
                            style={{
                              whiteSpace: 'pre-line',
                              overflowWrap: 'break-word',
                              wordWrap: 'break-word',
                              hyphens: 'auto',
                            }}
                            sx={{ fontSize: 14, marginTop: 0, marginLeft: 7, float: 'left' }}
                            noWrap
                          >
                            {notifUser.username} {notification.category} you!
                          </Typography>
                        </div>
                      </Link>
                    </Item>
                  );
                })}
            </Box>
          </div>
        </div>
        <Footer />
      </motion.div>
      <NavBarBottom />
    </>
  );
};
export default Notifications;
