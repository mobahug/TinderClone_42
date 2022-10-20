import React, { useState, createContext } from 'react';

export const MatchesContext = createContext();

export const MatchesContextProvider = (props) => {
  const [matches, setMatches] = useState([]);
  const [action, setAction] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <MatchesContext.Provider value={{ matches, setMatches, action, setAction, tags, setTags }}>
      {props.children}
    </MatchesContext.Provider>
  );
};
