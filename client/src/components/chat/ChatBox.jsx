import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import socket from '../../context/Socket';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import axiosApiInstance from '../hooks/axiosPrivate';
import { SocketContext } from '../../context/SocketContext';

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

const Chat = (props) => {
  const [conversation, setConversation] = useState(null);
  const [oldMessages, setOldMessages] = useState([]);
  const myRef = useRef('');
  const { newMessages, setNewMessages } = useContext(SocketContext);

  const [user, setUser] = useState([]);
  const [joined, setJoined] = useState(false);

  const handleInviteAccepted = useCallback(() => {
    setJoined(true);
  }, []);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const setRead = async (conversation_id) => {
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        await axiosApiInstance.post('/messages/setread', {
          id: conversation_id,
        });
      } else return;
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let id = window.location.pathname.slice(
        window.location.pathname.lastIndexOf('/') + 1,
        window.location.pathname.length
      );
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          const messages = await axiosApiInstance.post('/conversations/log', {
            id,
          });
          setOldMessages(messages.data.data.log);
          setNewMessages([]);
        } else return;
      } catch (err) {
        // console.log(err);
      }
    };
    // console.log('get converssation log triggered');
    fetchData();
  }, [axiosApiInstance]);

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        let id = props.id;
        try {
          const conv = await axiosApiInstance.post('/conversations/room/', {
            id,
          });
          // console.log('get conversation' + conv.data.data.conversation);
          // console.log(conv.data.data.conversation);
          setConversation(conv.data.data.conversation);
          setUser(conv.data.data.user_id);
          setRead(conv.data.data.conversation.conversation_id);
        } catch (err) {
          // console.log(err);
        }
      } else return;
    };
    // console.log('get converssation room triggered');
    fetchData();
  }, [axiosApiInstance]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    // console.log(myRef.current.value);
    try {
      // console.log(submitMessage);
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        await axiosApiInstance.post('/conversations/', {
          message: myRef.current.value,
          conversation_id: conversation.conversation_id,
        });

        const haveblock = await axiosApiInstance.post('/users/isblock/', {
          user_id: conversation.match_id,
        });
        if (haveblock.data.canblock === false) {
          socket.instance.emit('sendMessage', {
            senderId: user,
            sender_username: conversation.username,
            receiverId: conversation.match_id,
            uri: conversation.own_uri,
            text: myRef.current.value,
          });
        }
        socket.instance.emit('sendMessage', {
          senderId: conversation.match_id,
          sender_username: conversation.username,
          receiverId: user,
          uri: conversation.own_uri,
          text: myRef.current.value,
        });
        myRef.current.value = '';
      } else return;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div>
        <Link
          style={{
            fontSize: 16,
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
          }}
          to={'/viewsingle/' + conversation?.match_id}
        >
          <Avatar
            sx={{
              marginTop: 15,
              width: '150px',
              height: '150px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            src={conversation?.match_uri}
          />
          <Typography
            sx={{
              marginTop: 2,
              marginBottom: 2,
              textAlign: 'center',
            }}
          >
            {conversation?.match_username}
          </Typography>
        </Link>
        {conversation &&
          oldMessages &&
          oldMessages.map((message, value) => {
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
                  <ListItemIcon sx={{ float: 'left', padding: 'none' }}>
                    {/* {console.log(conversation)} */}
                    {message.id === user && (
                      <Avatar alt={conversation?.own_uri} src={conversation?.own_uri} />
                    )}
                    {message.id === conversation.match_id && (
                      <Avatar alt={conversation?.match_uri} src={conversation?.match_uri} />
                    )}
                  </ListItemIcon>
                  <Typography
                    style={{ fontSize: 10, marginTop: 0.1, marginLeft: 0, float: 'right' }}
                    noWrap
                  >
                    {message.time}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginTop: 0.1,
                      marginLeft: 0,
                      float: 'left',
                    }}
                    noWrap
                  >
                    {message.username}
                  </Typography>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
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
                      {message.message}
                    </Typography>
                  </div>
                </Item>
              </Box>
            );
          })}
      </div>
      <div id="newMessages">
        {newMessages &&
          newMessages.map((message, value) => {
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
                {value == 0 ? (
                  <Divider
                    sx={{ fontSize: 12, color: 'secondary.light', width: '100%', mb: 1.5 }}
                    orientation="horizontal"
                  >
                    New Messages
                  </Divider>
                ) : (
                  ''
                )}
                <Item style={{ marginTop: 0.5, width: '100%', maxWidth: 545 }}>
                  <ListItemIcon sx={{ float: 'left', padding: 'none' }}>
                    <Avatar alt={message?.uri} src={message?.uri} />
                  </ListItemIcon>
                  <Typography
                    style={{ fontSize: 10, marginTop: 0.1, marginLeft: 0, float: 'right' }}
                    noWrap
                  >
                    {message.time}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginTop: 0.1,
                      marginLeft: 0,
                      float: 'left',
                    }}
                    noWrap
                  >
                    {message.username}
                  </Typography>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
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
                      {message?.message}
                    </Typography>
                  </div>
                </Item>
              </Box>
            );
          })}
      </div>
      <div style={{ marginTop: 110 }} id="chatInput">
        <Paper
          onSubmit={onSubmitForm}
          component="form"
          sx={{
            position: 'fixed',
            bottom: 55.5,
            left: 0,
            right: 0,
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',

            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            maxWidth: 545,
          }}
        >
          <TextField
            type="text"
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            name="chattext"
            inputRef={myRef}
            className="form-control my-3"
            autoFocus={true}
            sx={{ p: '5px', ml: 0.5, flex: 'auto' }}
            placeholder="Write a message..."
            inputProps={{ maxLength: 254, 'aria-label': 'write a message...' }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <Tooltip title="Send">
            <IconButton
              type="submit"
              color="secondary"
              sx={{ p: '10px', margin: 'auto' }}
              className="btn btn-success btn-block"
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </div>
      <div ref={divRef} />
    </>
  );
};

export default Chat;
