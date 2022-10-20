import React, { useState, createContext } from 'react';

export const SocketContext = createContext();

export const SocketContextProvider = (props) => {
  const [notification, setNotification] = useState(0);
  const [message, setMessage] = useState(0);
  const [newMessages, setNewMessages] = useState([]);
  const [userOnline, setUserOnline] = useState();

  return (
    <SocketContext.Provider
      value={{
        notification,
        setNotification,
        message,
        setMessage,
        newMessages,
        setNewMessages,
        userOnline,
        setUserOnline,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  );
};
