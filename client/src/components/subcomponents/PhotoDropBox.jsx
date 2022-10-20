import Box from '@mui/material/Box';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axiosApiInstance from '../hooks/axiosPrivate';

const PhotoDropBox = (props) => {
  const shapeStyles = { bgcolor: 'default', opacity: 0.4, height: 240 };
  // const [photo_id, setPhoto_id] = useState[props.id];
  const [photo, setPhoto] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      width: '25px',
      height: '25px',
      right: 13,
      bottom: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  const removeImage = async (event) => {
    try {
      await axiosApiInstance.delete('/photo/' + props.id);
      setPhoto('');
    } catch (err) {
      // console.log('err');
    }
  };
  const remove = (
    <CancelIcon
      onClick={(event) => {
        removeImage(event);
      }}
    />
  );

  useEffect(() => {
    return setPhoto(props.old_photo?.uri);
  }, [props.old_photo]);

  const uploadPhoto = async (photo) => {
    const formData = new FormData();
    formData.append('profileImg', photo, props.id);
    try {
      const resp = await axiosApiInstance.post('/photo/upload', formData);
      if (resp.data.status === 'success') {
        const pic = URL.createObjectURL(photo);
        setPhoto(pic);
        const response3 = await axiosApiInstance.get('/users/profile');
        const newuser = response3.data.data.user;
        // console.log(newuser);
        localStorage.setItem('user', JSON.stringify(newuser));
      }
    } catch (err) {}
  };

  return (
    <>
      <ImageListItem>
        {!photo && (
          <Button variant="contained" component="label" style={shapeStyles}>
            <AddAPhotoIcon />

            <input
              type="file"
              hidden
              name="myImage"
              accept=".jpg, .jpeg, .png"
              onChange={(event) => {
                //setPhotos(event.target.files[0]);

                uploadPhoto(event.target.files[0]);
              }}
            />
          </Button>
        )}

        <Stack spacing={3} direction="row">
          <Box>
            {photo && (
              <StyledBadge
                color="warning"
                badgeContent={remove}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <Box component="span" sx={{ border: '1px' }}>
                  <Card>
                    <CardMedia component="img" alt="pic" height="240" image={photo} />
                  </Card>
                </Box>
              </StyledBadge>
            )}
          </Box>
        </Stack>
      </ImageListItem>
    </>
  );
};

export default PhotoDropBox;
