import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApiInstance from '../hooks/axiosPrivate';
import matcha from '../../apis/Matcha';

const ActivateUser = (props) => {
  let navigate = useNavigate();

  useEffect(() => {
    async function activate() {
      let activationKeyCode = window.location.pathname.split('/'.slice(-1)[0]);
      // console.log(activationKeyCode);
      if (activationKeyCode.length != 5) {
        return;
      }
      try {
        const response = await matcha.get(
          '/users/activate/' + activationKeyCode[3] + '/' + activationKeyCode[4]
        );
        navigate('/');
      } catch (err) {
        // console.log(err);
      }
    }
    return () => {
      activate();
    };
  }, []);
};

export default ActivateUser;
