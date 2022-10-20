import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MatchesContext } from '../../context/MatchesContext';
import ImageList from '@mui/material/ImageList';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import FilterControls from './FilterControls';
import axiosApiInstance from '../hooks/axiosPrivate';

const ExploreGallery = (props) => {
  const { matches } = useContext(MatchesContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [usersTags, setUsersTags] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const tags = await axiosApiInstance.post('/tag/userstag');
        setUsersTags(tags.data.data.tags);
      } else return;
    };
    // console.log(matches);
    // console.log(typeof matches);
    // console.log(usersTags);
    return fetchData;
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Box style={{ marginTop: 75 }}>
        <FilterControls can_change_limit="true" limits="10" user={user} />
      </Box>
      {matches.length === 0 && (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh', color: 'lightgrey' }}
        >
          <Typography variant="h3" component="h3" align="center">
            no matches :(
            {!user.gender && <> Please setup your gender and photo to get matches</>}
          </Typography>
          ;
        </Grid>
      )}
      <ImageList
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          marginTop: 2,
          width: '100%',
          maxWidth: 345,
        }}
      >
        {matches &&
          matches.map((match, value) => {
            return (
              <ImageListItem key={value} component={Link} to={'/explore/' + match.id}>
                <img
                  style={{ borderRadius: 5 }}
                  image={`${match.photo}?w=248&fit=crop&auto=format`}
                  srcSet={`${match.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt="match"
                />

                <ImageListItemBar
                  style={{
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    backgroundOpacity: '5%',
                  }}
                  title={match.firstname}
                  subtitle={`${parseInt(match.distance / 1000)} km away`}
                />
              </ImageListItem>
            );
          })}
      </ImageList>
    </Box>
  );
};
export default ExploreGallery;
