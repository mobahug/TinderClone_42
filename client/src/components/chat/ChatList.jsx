import React, { useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axiosApiInstance from '../hooks/axiosPrivate';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Header from '../subcomponents/NavBarTop';
import NavBarBottom from '../subcomponents/NavBarBottom';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Footer from '../subcomponents/Footer';

import socket from '../../context/Socket';
import { motion } from 'framer-motion';

const ChatList = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [conversations, setConversations] = useState([[]]);

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
  const remove = async (event, id, n) => {
    // try {
    // console.log(conversations);
    // console.log(conversations[n]);
    const refreshToken = sessionStorage.getItem('refreshtoken');
    if (refreshToken) {
      const haveblock = await axiosApiInstance.post('/users/isblock/', {
        user_id: conversations[id].match_id,
      });
      // console.log(haveblock.data.canblock);
      await axiosApiInstance.post('/users/unlike', {
        conversation_id: n,
        user_id: conversations[id].match_id,
      });
      if (haveblock.data.canblock === false) {
        // console.log(conversations[id]);
        socket.instance.emit('sendMessage', {
          senderId: user.id,
          receiverId: conversations[id].match_id,
          text: 'unlike',
          is_notification: 'true',
          uri: user.photo,
          sender_username: user.firstname,
        });
      }
    } else return;
    // } catch {
    //   // console.log('err');
    // }

    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const response = await axiosApiInstance.get('/conversations');
        // console.log(response.data.data.conversations)
        setConversations(response.data.data.conversations);
      } else return;
    } catch (err) {
      // console.log(err);
    }
  };

  const shapeStyles = { bgcolor: 'default', opacity: 0.4, height: 240 };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      width: '25px',
      height: '25px',
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          const response = await axiosApiInstance.get('/conversations');
          // console.log(response.data.data.conversations)
          setConversations(response.data.data.conversations);
        } else return;
      } catch (err) {
        // console.log(err);
      }
    };
    return fetchData;
  }, [axiosApiInstance]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div style={{ marginTop: 100 }}>
        <Header />
        {conversations.length === 0 && (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', color: 'lightgrey' }}
          >
            <Typography variant="h3" component="h3" align="center">
              no conversations :(
            </Typography>
            ;
          </Grid>
        )}
        {conversations.length !== 0 &&
          conversations.map((conversation, value) => {
            const user = JSON.parse(localStorage.getItem('user'));
            // console.log(user.id);
            return (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  padding: 1,
                }}
                key={value}
              >
                <Item style={{ marginTop: 0.5, width: '100%', maxWidth: 545 }}>
                  <IconButton
                    aria-label="delete"
                    name={conversation?.conversation_id}
                    id={value}
                    onClick={(e) => remove(e, value, conversation?.conversation_id)}
                    sx={{ float: 'right', margin: 0, padding: 0 }}
                  >
                    <CancelIcon />
                  </IconButton>
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    to={'/chat/chat/' + conversation.conversation_id}
                  >
                    <ListItemIcon sx={{ float: 'left', padding: 'none' }}>
                      <Avatar sx={{ width: 56, height: 56 }} src={conversation?.match_uri} />
                    </ListItemIcon>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 0.1,
                        marginLeft: 15,
                        float: 'left',
                      }}
                      noWrap
                    >
                      {conversation?.match_username}
                    </Typography>
                    <Typography
                      style={{ fontSize: 12, marginTop: 0.1, marginLeft: 0, float: 'right' }}
                      noWrap
                    >
                      {conversation?.date}
                    </Typography>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                      <Typography
                        sx={{ fontSize: 14, marginTop: 0, marginLeft: 9, float: 'left' }}
                        noWrap
                      >
                        {conversation?.last_message && conversation?.last_message}
                      </Typography>
                    </div>
                  </Link>
                </Item>
              </Box>
            );
          })}
        <Footer />
        <NavBarBottom />
      </div>
    </motion.div>
  );
};

export default ChatList;
