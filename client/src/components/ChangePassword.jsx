import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Footer from './subcomponents/Footer';
import axiosApiInstance from './hooks/axiosPrivate';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChangePassword = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    password: '',
    passwordVerify: '',
    key: '',
    username: '',
  });
  let navigate = useNavigate();

  const { username, password, key } = inputs;
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

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
      const response = await axiosApiInstance.post('/users/changepw', {
        password,
        key,
        username,
      });
      if (response.request.status === 201) {
        navigate('/login');
        toast.success('Password updated');
      }
    } catch (err) {
      toast.error('Password failed to update', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrors(err.response?.data?.results);

      // console.error(err.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        onClick={clickAway}
      >
        <Grid item xs={3}>
          <Container>
            <Container component="main" maxWidth="xs">
              <Paper>
                <Box
                  sx={{
                    margin: 5,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Change password
                  </Typography>
                  <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
                    <TextField
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      required
                      fullWidth
                      type="text"
                      name="username"
                      id="username"
                      label="Username"
                      value={username || ''}
                      error={errors?.username?.reason.length > 0}
                      helperText={errors?.username?.reason}
                      onChange={(e) => onChange(e)}
                      autoComplete="off"
                    />

                    <TextField
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      required
                      fullWidth
                      type="key"
                      name="key"
                      id="key"
                      label="Key"
                      value={key || ''}
                      error={errors?.key?.reason.length > 0}
                      helperText={errors?.key?.reason}
                      onChange={(e) => onChange(e)}
                      autoComplete="off"
                    />

                    <TextField
                      inputProps={{ maxLength: 50 }}
                      margin="normal"
                      required
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      label="Password"
                      value={password || ''}
                      error={errors?.password?.reason.length > 0}
                      helperText={errors?.password?.reason}
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

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Submit
                    </Button>
                  </Box>
                  <Grid container>
                    <Grid item xs sx={{ mb: 2 }}>
                      <Link href="/" variant="body2">
                        {'Back to Login'}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Container>
          </Container>
          <Footer />
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default ChangePassword;
