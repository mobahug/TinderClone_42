import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
const Logout = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }, [navigate]);

  return <></>;
};
export default Logout;
