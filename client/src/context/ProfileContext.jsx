import React, { useState, createContext } from 'react';

export const ProfileContext = createContext();

export const ProfileContextProvider = (props) => {
  const [inputs, setInputs] = useState({});

  return (
    <ProfileContext.Provider value={{ inputs, setInputs }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
