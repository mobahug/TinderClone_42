import React, { useContext, useEffect, useState } from 'react';
import { MatchesContext } from '../../context/MatchesContext';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import Carousel from 'react-material-ui-carousel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import FilterControls from './FilterControls';
import socket from '../../context/Socket';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import Tooltip from '@mui/material/Tooltip';
import axiosApiInstance from '../hooks/axiosPrivate';
import Divider from '@mui/material/Divider';
import { SocketContext } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',

  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ViewMatch = (props) => {
  let navigate = useNavigate();

  const [user, setUser] = useState([[]]);
  const { userOnline, setUserOnline } = useContext(SocketContext);
  const { matches } = useContext(MatchesContext);
  const [match, setMatch] = useState({});
  const [tags, setTags] = useState({});
  const [profileOpen, setProfileOpen] = useState(false);
  const [usersTags, setUsersTags] = useState([]);
  const { setAction } = useContext(MatchesContext);
  const [expanded, setExpanded] = useState(false);
  const [canBlock, setCanBlock] = useState(props.canBlock);
  const [canLike, setCanLike] = useState(props.canLike);
  useEffect(() => {
    if (props.isSingle) {
      setCanBlock(false);
      setExpanded(true);
      setCanLike(false);
    }
    if (props.isGetNext || props.isExplore) {
      setExpanded(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const tags = await axiosApiInstance.post('/tag/userstag');
        setUsersTags(tags.data.data.tags);
      } else return;
    };
    return fetchData;
  }, []);
  const handleExpandClick = async () => {
    setExpanded(true);

    if (!profileOpen) {
      await fetchPhotos(match.id);
      await fetchTags(match.id);
      if (user?.id) {
        const haveblock = await axiosApiInstance.post('/users/isblock/', {
          user_id: match.id,
        });
        // console.log(haveblock.data.canblock);
        if (haveblock.data.canblock === false) {
          axiosApiInstance.post('/users/visit/', { user_id: match.id });
          socket.instance.emit('sendMessage', {
            senderId: user.id,
            receiverId: match.id,
            text: 'visit',
            is_notification: 'true',
            uri: user.photo,
            sender_username: user.firstname,
          });
        }
      }
    }
    setProfileOpen(true);
  };

  const findUserOnline = () => {
    socket.instance.emit('sendMessage', {
      senderId: user.id,
      receiverId: match.id,
    });
  };

  useEffect(() => {
    if (!props.match) {
      // console.log('set1');
      setMatch(matches[0]);
    } else if ((props.isSingle && !props.canLike) || props.isExplore) {
      // console.log('set2');
      setMatch(props.match);
    } else {
      // console.log('set3');
      setMatch(false);
    }
    if (match?.id) {
      findUserOnline();
    }
  }, [matches, props, match?.id]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  async function handleClick(e, action) {
    // console.log(action);
    // console.log(user);
    if (action === 'like' && user.photo) {
      setProfileOpen(false);
      setExpanded(false);
      const haveblock = await axiosApiInstance.post('/users/isblock/', {
        user_id: match.id,
      });
      // console.log(haveblock.data.canblock);
      if (haveblock.data.canblock === false) {
        const resp = await axiosApiInstance.post('/users/like/', { user_id: match.id });
        // console.log(resp.data.match);
        let text = 'like';
        if (resp.data.match) {
          text = 'match';
        }
        socket.instance.emit('sendMessage', {
          senderId: user.id,
          receiverId: match.id,
          text,
          is_notification: 'true',
          uri: user.photo,
          sender_username: user.firstname,
        });
        if (resp.data.match) {
          socket.instance.emit('sendMessage', {
            senderId: match.id,
            receiverId: user.id,
            text,
            is_notification: 'true',
            uri: match.photo,
            sender_username: match.firstname,
          });
        }
      }
      setAction(true);
      if (props.isFind === false) navigate(-1);
    }

    if (action === 'block') {
      setProfileOpen(false);
      setExpanded(false);
      axiosApiInstance.post('/users/block/', { user_id: match.id });
      setAction(true);

      if (props.isFind === false) navigate('/explore');
    }

    if (action === 'report') {
      axiosApiInstance.post('/users/report/', { id: match.id });
      toast.info('User Reported!');
      setProfileOpen(false);
      setExpanded(false);
      axiosApiInstance.post('/users/block/', { user_id: match.id });
      setAction(true);

      if (props.isFind === false) navigate('/explore');
    }
  }

  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async (id) => {
    try {
      const response = await axiosApiInstance.get('/photo/' + id);
      setPhotos(response.data.data.photos);
    } catch {
      // console.log('error getting photos');
    }
  };

  const fetchTags = async (id) => {
    try {
      const response2 = await axiosApiInstance.get('/tag/' + id);
      // console.log(response.data.data.users);
      setTags(response2.data.data.tags);
      // console.log(response2.data.data);
    } catch {}
    // console.log(match);
    // console.log(tags);
  };

  function Item(props) {
    return <img alt="profilepic" width="345" src={props.item.uri}></img>;
  }
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={match?.id}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', marginTop: 18 }}
          >
            <Box style={{ marginTop: 75, align: 'center' }}>
              {!props.isSingle && !props.isExplore && match !== false && (
                <FilterControls
                  can_change_limit="false"
                  limits="1"
                  user={JSON.parse(localStorage.getItem('user'))}
                />
              )}
            </Box>
            <Grid item xs={3}>
              <Container component="main" maxWidth="xs">
                {props.isFind === true && matches.length === 0 && (
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
                      {!user.gender && <> Please setup your profile to get matches</>}
                    </Typography>
                    ;
                  </Grid>
                )}
                {match && (
                  <Card sx={{ maxWidth: 345, width: '100%' }}>
                    <Stack direction="row" spacing="10">
                      <Tooltip title="Report profile">
                        <IconButton
                          color="default"
                          className="btn btn-success btn-block"
                          onClick={(e) => handleClick(e, 'report')}
                          name="report"
                        >
                          <FlagIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </Stack>

                    {profileOpen && (
                      <Carousel sx={{ height: 345, width: 345 }} autoPlay={false}>
                        {photos.map((item, i) => (
                          <Item key={i} item={item} />
                        ))}
                      </Carousel>
                    )}
                    {!profileOpen && (
                      <CardMedia
                        component="img"
                        style={{ height: 345 }}
                        image={match && match.photo}
                        alt="photo"
                      />
                    )}

                    <CardContent>
                      <Typography variant="h5">
                        <b>{match?.firstname}</b>, {match?.age?.years}
                      </Typography>
                      <Typography variant="h7">
                        <Tooltip title="Distance">
                          <PlaceIcon fontSize="small" />
                        </Tooltip>
                        &nbsp;{match && parseInt(match.distance / 1000)} kms away.. <br />
                        <Tooltip title="Fame">
                          <StarIcon fontSize="small" />
                        </Tooltip>
                        &nbsp;{match?.fame} <br />
                        <Tooltip title="Last seen">
                          <VisibilityIcon fontSize="small" />
                        </Tooltip>
                        {!userOnline && (
                          <>
                            &nbsp;{match?.logged_in_string} <br />
                          </>
                        )}
                        {userOnline && <>&nbsp;Online right now!</>}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ marginTop: -4 }}>
                      {canBlock && (
                        <IconButton
                          color="warning"
                          onClick={(e) => handleClick(e, 'block')}
                          name="block"
                        >
                          <Tooltip title="Block">
                            <ClearIcon fontSize="large" />
                          </Tooltip>
                        </IconButton>
                      )}

                      {!expanded && (
                        <>
                          <InfoIcon
                            color="inherit"
                            fontSize="medium"
                            style={{ marginLeft: '24%' }}
                          />
                          <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                          >
                            <Tooltip title="View profile">
                              <ExpandMoreIcon />
                            </Tooltip>
                          </ExpandMore>
                        </>
                      )}
                      {match && canLike && (
                        <IconButton
                          color="success"
                          onClick={(e) => handleClick(e, 'like')}
                          name="like"
                          style={{ marginLeft: 'auto' }}
                        >
                          <Tooltip title="Like">
                            <FavoriteIcon fontSize="large" />
                          </Tooltip>
                        </IconButton>
                      )}
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <div>
                          <Divider style={{ marginBottom: 5 }} />
                          <b>Bio:</b>
                          <Typography paragraph>{match?.bio}</Typography>
                          <Divider style={{ marginBottom: 5 }} />
                          <b>Interests:</b>
                          {props.tags &&
                            Object.keys(props.tags).map((tag) => (
                              <Typography key={tag}>{props.tags[tag].name}</Typography>
                            ))}
                          {tags &&
                            Object.keys(tags).map((tag) => (
                              <Typography key={tag}>{tags[tag].name}</Typography>
                            ))}
                          <Typography paragraph>{tags?.name}</Typography>
                        </div>
                      </CardContent>
                    </Collapse>
                  </Card>
                )}
              </Container>
            </Grid>
          </Grid>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default ViewMatch;
