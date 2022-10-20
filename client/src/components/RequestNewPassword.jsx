import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import matcha from '../apis/Matcha';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Footer from './subcomponents/Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const theme = createTheme();

const RequestNewPassword = () => {
  const [inputs, setInputs] = useState({
    email: '',
    username: '',
  });
  const [errors, setErrors] = useState({});
  const { email, username } = inputs;

  const onChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await matcha.post('/users/requestpw', {
        username,
        email,
      });
      if (response.request.status === 201)
        toast.success('Password recovery link sent! Check your email!');
    } catch (err) {
      toast.error("Username and email doesn't match or not found!", {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setErrors(err.response?.data?.results);
    }
  };

  const clickAway = () => {
    setErrors(null);
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
                      margin: 5,
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Account recovery
                    </Typography>

                    <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
                      <Box>
                        <TextField
                          inputProps={{ maxLength: 50 }}
                          margin="normal"
                          required
                          fullWidth
                          placeholder="Username"
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
                          inputProps={{ maxLength: 254 }}
                          margin="normal"
                          required
                          fullWidth
                          type="email"
                          value={email || ''}
                          error={errors?.email?.reason.length > 0}
                          helperText={errors?.email?.reason}
                          onChange={(e) => onChange(e)}
                          placeholder="Email Address"
                          name="email"
                          id="email"
                          label="Email Address"
                          autoComplete="off"
                          autoFocus
                        />
                      </Box>
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
      </ThemeProvider>
    </motion.div>
  );
};

export default RequestNewPassword;
