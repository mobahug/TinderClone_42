import React from 'react';
import Typography from '@mui/material/Typography';
import BasicDetails from './subcomponents/BasicDetails';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Footer from './subcomponents/Footer';
import Link from '@mui/material/Link';
import { motion } from 'framer-motion';

const Register = (props) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Container>
            <Container component="main" maxWidth="xs">
              <Typography component="h1" variant="h5" align="center">
                Create account
              </Typography>
              <BasicDetails />
              <Link href="/" variant="body2">
                {'Back to Login'}
              </Link>
            </Container>
          </Container>
          <Footer />
        </Grid>
      </Grid>
    </motion.div>
  );
};
export default Register;
