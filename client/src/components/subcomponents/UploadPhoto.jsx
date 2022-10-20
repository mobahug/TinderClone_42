import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import PhotoDropBox from './PhotoDropBox';
import Typography from '@mui/material/Typography';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import axiosApiInstance from '../hooks/axiosPrivate';

const UploadPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchPhotos = async () => {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const res = await axiosApiInstance.get('/photo/' + user.id);
        if (res.data.status === 'success') {
          setPhotos(res.data.data.photos);
        }
      } else return;
    };
    return fetchPhotos;
  }, []);

  return (
    <>
      <Box sx={{ mb: '30px', border: 1, borderRadius: '10px', color: '#D8D8D8' }}>
        <ImageList sx={{ margin: '5px', padding: '10px' }}>
          <PhotoDropBox id="0" old_photo={photos.find((element) => element.num === 0)} />

          <Typography
            sx={{
              position: 'absolute',
              color: 'white',
              bgcolor: 'text.disabled',
              borderRadius: 25,
            }}
          >
            <PersonPinIcon fontSize="large" />
          </Typography>
          <PhotoDropBox id="1" old_photo={photos.find((element) => element.num === 1)} />
          <PhotoDropBox id="2" old_photo={photos.find((element) => element.num === 2)} />
          <PhotoDropBox id="3" old_photo={photos.find((element) => element.num === 3)} />
          <PhotoDropBox id="4" old_photo={photos.find((element) => element.num === 4)} />
        </ImageList>
      </Box>
    </>
  );
};

export default UploadPhoto;
