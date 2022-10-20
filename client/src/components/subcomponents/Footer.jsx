import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = (props) => {
  return (
    <>
      <Box sx={{ pt: '100px', textAlign: 'center' }}>
        <Typography>
          <a
            style={{ textDecoration: 'none', color: 'inherit' }}
            href="/privacy_policy.html"
            target="_blank"
            rel="noreferrer"
          >
            <b> Privacy policy</b>,
          </a>
          &nbsp;&nbsp; Matcha by &nbsp;
          <a
            style={{ textDecoration: 'none', color: 'inherit' }}
            href="        https://github.com/mobahug"
            target="_blank"
            rel="noreferrer"
          >
            <b>ghorvath</b>
          </a>
          ,&nbsp;
          <a
            style={{ textDecoration: 'none', color: 'inherit' }}
            href="https://gitlab.com/vilniemi"
            target="_blank"
            rel="noreferrer"
          >
            <b>vniemi</b>
          </a>
        </Typography>
      </Box>
    </>
  );
};
export default Footer;
