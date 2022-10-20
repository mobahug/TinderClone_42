import React, { useContext } from 'react';
import BasicDetails from './subcomponents/BasicDetails';
import Footer from './subcomponents/Footer';
import AddDetails from './subcomponents/AddDetails';
import NavBarTop from './subcomponents/NavBarTop';
import NavBarBottom from './subcomponents/NavBarBottom';
import AuthContext from '../context/AuthContext';
import Tags from './subcomponents/Tags';
import Location from './subcomponents/Location';
import UploadPhoto from './subcomponents/UploadPhoto';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';

const GetNextMatch = (props) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <NavBarTop />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography align="left" component="h5" variant="h5" paddingLeft="h6">
            Basic Details
          </Typography>
          <BasicDetails user={JSON.parse(localStorage.getItem('user'))} />
          <Typography align="left" component="h5" variant="h5">
            Add Details
          </Typography>
          <AddDetails user={JSON.parse(localStorage.getItem('user'))} />
          <Typography align="left" component="h5" variant="h5">
            Tags
          </Typography>
          <Tags />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography align="left" component="h5" variant="h5">
              Photos
            </Typography>
            <Tooltip title="Image size max.: 1 megabyte">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <UploadPhoto />
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Typography align="left" component="h5" variant="h5">
              Location
            </Typography>
            <Tooltip title="Click to the map to update your location">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Location />
        </Box>
        <Footer />
      </Container>

      <NavBarBottom />
    </motion.div>
  );
};

export default GetNextMatch;
