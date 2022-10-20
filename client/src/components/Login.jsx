import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../background.png';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import React, { useState } from 'react';
import matcha from '../apis/Matcha';
import { useNavigate } from 'react-router-dom';
import Footer from './subcomponents/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';

const theme = createTheme();

const Login = ({ props }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [user, setUser] = useState({ auth: false });

  let navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { username, password } = inputs;
  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const getGeoLoc = async () => {
    try {
      const loc = await axios.get('https://geolocation-db.com/json/');

      let ipLatitude = loc.data.latitude;
      let ipLongitude = loc.data.longitude;
      return [ipLatitude, ipLongitude];
    } catch (err) {
      // console.log(err);
      let ipLatitude = '60.192059';
      let ipLongitude = '24.945831';
      return [ipLatitude, ipLongitude];
    }
  };

  const clickAway = () => {
    setErrors(null);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const loc = await getGeoLoc();

    try {
      const response = await matcha.post('/login', {
        username,
        password,
        ipLatitude: loc[0],
        ipLongitude: loc[1],
      });
      if (response.data.jwtToken) {
        localStorage.setItem('token', response.data.jwtToken);
        matcha.defaults.headers.common['Authorization'] = 'Bearer' + response.data.token;
        setUser(response.data.user);
        if (!response.data.user.latitude) {
          response.data.user.latitude = 25;
          response.data.user.longitude = 64;
        }
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('photos', JSON.stringify(response.data.photos));
        localStorage.setItem('tags', JSON.stringify(response.data.tags));
        sessionStorage.setItem('refreshtoken', response.data.refreshtoken);
        if (response.data.user.gender === null) {
          navigate('/profile');
        } else {
          navigate('/match');
        }
      } else return;
    } catch (err) {
      toast.error('Invalid credentials!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // console.log(err.response?.data?.results);
      setErrors(err.response?.data?.results);

      // console.log(err.request.status);

      // if (err.request.status === 401) {
      //   setError(err.request);
      // }
      // /* if (err.request.response == '') {
      //   setError(err.response.data);
      // } */
      // else {
      //   setError(err.response?.data?.results);
      // }
    }
  };
  const styles = {
    paperContainer: {
      // backgroundImage: `url(${Image})`,
      backgroundSize: `40%`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'bottom left',
      // backgroundSize: 'cover',
    },

    typography: {
      align: 'center',
    },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ThemeProvider theme={theme}>
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
            <Container style={styles.paperContainer}>
              <Container component="main" maxWidth="xs">
                <Paper>
                  <CssBaseline />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {/* ======= FORM STARTS HERE ======= */}
                    <Box
                      component="form"
                      onSubmit={onSubmitForm}
                      noValidate
                      sx={{
                        margin: 5,
                        mt: 2,
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <img justify="center" width="25%" height="25%" src={Image} alt="logo" />
                      <Typography component="h1" variant="h5" align="center">
                        Sign in to Matcha
                      </Typography>
                      <TextField
                        inputProps={{ maxLength: 20 }}
                        margin="normal"
                        required
                        fullWidth
                        error={errors?.username?.reason.length > 0}
                        helperText={errors?.username?.reason}
                        id="username"
                        label="Username"
                        placeholder="Username"
                        name="username"
                        autoComplete="off"
                        value={username || ''}
                        // error={error?.username?.reason != null || error?.username?.reason === '' || error?.status === 401 ? 'Invalid credentials!' : null}
                        // helperText={error?.username?.reason != null || error?.username?.reason === '' || error?.status === 401 ? 'Invalid credentials!' : null}
                        onChange={(e) => onChange(e)}
                        autoFocus
                      />
                      <TextField
                        inputProps={{ maxLength: 50 }}
                        margin="normal"
                        required
                        fullWidth
                        error={errors?.password?.reason.length > 0}
                        helperText={errors?.password?.reason}
                        name="password"
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        label="Password"
                        value={password || ''}
                        // error={error?.password?.reason != null || error?.password?.reason === '' || error?.status === 401 ? 'Invalid credentials!' : null}
                        // helperText={error?.password?.reason != null || error?.password?.reason === '' || error?.status === 401 ? 'Invalid credentials!' : null}
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
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="/requestpw" variant="body2">
                            {'Forget password?'}
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href="/Register" variant="body2">
                            {'Create account'}
                          </Link>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Paper>
              </Container>
            </Container>
            <Footer />
          </Grid>
        </Grid>
      </ThemeProvider>
    </motion.div>
  );
};

export default Login;
