import React, { useState, useEffect, useContext } from 'react';
import matcha from '../../apis/Matcha';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext';
import axiosApiInstance from '../hooks/axiosPrivate';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';

import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const BasicDetails = ({ user }) => {
  let navigate = useNavigate();

  const [userChanged, setUserChanged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    username: '',
  });
  const [errors, setErrors] = useState({});
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      setInputs({
        email: user?.email,
        firstname: user?.firstname,
        lastname: user?.lastname,
        username: user?.username,
      });
    }
    setUserChanged(true);
    // ref.current.value = user?.firstname;
  }, [user]);
  // const ref = useRef(null);

  const { email, password, firstname, lastname, username } = inputs;

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
  const getDifference = (dict) => {
    const difference = {};
    for (const [key, value] of Object.entries(user)) {
      if (dict[key] && value !== dict[key]) {
        difference[key] = dict[key];
      }
    }
    return difference;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const clickAway = () => {
    setErrors(null);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        // const token = localStorage.getItem('token');
        // matcha.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          const body = getDifference({ firstname, lastname, username, email });
          if (body != {}) {
            const response = await axiosApiInstance.patch('/users', body);
            if (response.request.status === 200) {
              try {
                const response3 = await axiosApiInstance.get('/users/profile');
                user = response3.data.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                setAuth({ auth: true, user });
              } catch (err) {
                console.error(err.message);
              }
            }
            toast.success('Details updated');
          } else {
            toast.error('Invalid Credentials');
          }
          if (password === undefined) {
            return;
          } else {
            // console.log('password');
            // console.log(typeof password);
            await axiosApiInstance.patch('/users/password', { password: password });
            toast.success('Details updated', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      } else {
        const response = await matcha.post('/register', {
          firstname,
          lastname,
          username,
          email,
          password,
        });
        if (response.data.status === 'success') {
          toast.success('Click the link in your email to active your account.');
          navigate('/login');
        }
      }
    } catch (err) {
      setErrors(err.response?.data?.results);
    }
    setUserChanged(true);
  };
  return (
    <Box sx={{ mb: '30px', padding: '10px', border: 1, borderRadius: '10px', color: '#D8D8D8' }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} onClick={clickAway}>
                <TextField
                  error={errors?.firstname?.reason.length > 0}
                  inputProps={{ maxLength: 20 }}
                  required
                  helperText={errors?.firstname?.reason}
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  // ref={ref}
                  value={firstname || ''}
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                  // autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6} onClick={clickAway}>
                <TextField
                  inputProps={{ maxLength: 20 }}
                  required
                  fullWidth
                  error={errors?.lastname?.reason.length > 0}
                  helperText={errors?.lastname?.reason}
                  // helperText={errors?.lastname}
                  id="lastname"
                  label="Last Name"
                  value={lastname || ''}
                  name="lastname"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} onClick={clickAway}>
                <TextField
                  inputProps={{ maxLength: 20 }}
                  required
                  fullWidth
                  error={errors?.username?.reason.length > 0}
                  helperText={errors?.username?.reason}
                  id="username"
                  label="Username"
                  name="username"
                  value={username || ''}
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} onClick={clickAway}>
                <TextField
                  inputProps={{ maxLength: 40 }}
                  required
                  fullWidth
                  error={errors?.email?.reason.length > 0}
                  helperText={errors?.email?.reason}
                  id="email"
                  type="email"
                  label="Email Address"
                  value={email || ''}
                  name="email"
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                />
              </Grid>

              <Grid item xs={12} onClick={clickAway}>
                <TextField
                  inputProps={{ maxLength: 50 }}
                  required
                  fullWidth
                  error={errors?.password?.reason.length > 0}
                  helperText={errors?.password?.reason}
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password || ''}
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" sx={{ float: 'right', mt: 3, mb: 2, mr: 1 }}>
              Save
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BasicDetails;
