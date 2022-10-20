import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';
import Avatar from '@mui/material/Avatar';
import { toast } from 'react-toastify';
import socket from '../../context/Socket';
import { format } from 'date-fns';
import Typography from '@mui/material/Typography';

const SocketReceiver = (props) => {
  const { newMessages, setNewMessages } = useContext(SocketContext);
  const { message, setMessage } = useContext(SocketContext);
  const { notification, setNotification } = useContext(SocketContext);
  const { userOnline, setUserOnline } = useContext(SocketContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.id) {
      socket.instance.emit('addUser', user.id);
    }
  }, [socket.instance, user]);

  useEffect(() => {
    socket.instance.on('getMessage', (data) => {
      // console.log(data);

      //VIEWMATCH Show requested user is online or not
      if (data.isOnline == 'true') {
        setUserOnline(true);
      } else {
        setUserOnline(false);
      }

      if (data.text) {
        //NOTIFICATION
        if (data?.is_notification == 'true') {
          toast(
            <>
              <Avatar src={data.uri} />
              {data.text + ' by ' + data.sender_username}
            </>
          );
          let mnum = notification;
          mnum += 1;
          setNotification(mnum);
        } else if (data.sender_username != user.username) {
          //MESSAGE COUNTER
          let mnum = message;
          mnum += 1;
          setMessage(mnum);
        }

        //CHATMESSAGE
        if (data?.is_notification != 'true') {
          let currentdate = new Date();
          const result = format(currentdate, 'HH:mm');
          let msg = {
            time: result,
            username: data.sender_username,
            message: data.text,
            uri: data.uri,
          };
          setNewMessages((newMessages) => [...newMessages, msg]);
        }
      }
    });

    return () => {
      socket.instance.off('getMessage');
    };
  }, [socket.instance, notification, message, newMessages]);
};
export default SocketReceiver;
