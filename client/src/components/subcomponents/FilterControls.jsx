import React, { useEffect, useState, useContext } from 'react';
import dateFormat from 'dateformat';
import { MatchesContext } from '../../context/MatchesContext';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TuneIcon from '@mui/icons-material/Tune';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import axiosApiInstance from '../hooks/axiosPrivate';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

const FilterControls = (props) => {
  const marks = [
    {
      value: 1,
      label: '1 km',
    },
    {
      value: 500,
      label: '500 km',
    },

    {
      value: 1000,
      label: '1000 km',
    },
  ];

  const agemarks = [
    {
      value: 16,
      label: '16 years',
    },
    {
      value: 50,
      label: '50 years',
    },

    {
      value: 100,
      label: '100 years',
    },
  ];

  const [newTags, setNewTags] = useState('');
  const [newTag, setNewTag] = useState('');
  const [ageState, setAgeState] = useState(50);
  const [anchorEl, setAnchorEl] = useState(null);
  const { setMatches } = useContext(MatchesContext);
  const can_change_limit = props.can_change_limit;
  const limits = props.limits;
  const [inputsSet, setInputsSet] = useState(false);
  const user = props.user;
  const [inputs, setInputs] = useState({
    preference: 'both',
    maxdistance: 500,
    mindate: '01-01-1950',
    maxdate: '01-01-2020',
    limit: limits,
    tags: '',
    orderby: 'age',
  });
  const { action, setAction } = useContext(MatchesContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const removeUserTagsFromState = (event, value) => {
    event.preventDefault();
    let id = value;
    // console.log(newTag);
    const list = [...newTags];
    for (var i = 0; i < list.length; i++) {
      if (list[i] === id) {
        list.splice(i, 1);
        i--;
      }
    }
    setNewTags(list);
  };

  //LOAD
  // useEffect(() => {
  //   const loadInputs = () => {
  //     if (localStorage.getItem('filtercontrols') !== null) {
  //       let nInputs = JSON.parse(localStorage.getItem('filtercontrols'));
  //       // setInputs({ ...nInputs, [limit]: props.limits });

  //       // console.log('LOADING');
  //       // console.log(nInputs.age);
  //       //ge = dateFormat(nInputs.mindate, 'yyyy');
  //       // console.log(nInputs.tags);
  //       setAgeState(nInputs.age);
  //       setNewTags(nInputs.tags);
  //       // console.log('LOADING');
  //     } else {
  //       inputs.preference = user.preference;
  //       let year = dateFormat(user.birthdate, 'yyyy');
  //       year = year - 10;
  //       let yearStr = year + '-01-01';
  //       inputs.mindate = dateFormat(yearStr, 'dd-mm-yyyy');
  //       inputs.limit = props.limits;
  //       inputs.tags = newTags;
  //       console.log(inputs);
  //     }

  //     setInputsSet(true);
  //   };
  //   return loadInputs;
  // }, []);
  // useEffect(() => {
  //   const addDefaultTags = () => {
  //     const refreshToken = sessionStorage.getItem('refreshtoken');
  //     if (refreshToken) {
  //       const list = [];
  //       let oldTags = [];
  //       if (localStorage.getItem('filtercontrols') == null) {
  //         oldTags = JSON.parse(localStorage.getItem('tags'));
  //         if (oldTags) {
  //           oldTags.forEach(function (d) {
  //             list.push(d.name);
  //           });
  //           setNewTags(list);
  //         }
  //       } else {
  //         // console.log(JSON.parse(localStorage.getItem('filtercontrols')).tags);
  //         setNewTags(JSON.parse(localStorage.getItem('filtercontrols')).tags);
  //       }
  //     } else return;
  //   };
  //   return addDefaultTags;
  // }, []);
  const { age, preference, maxdistance, mindate, maxdate, tags, limit, orderby } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAge = (e) => {
    setAgeState(e.target.value);
    let year = 2022 - e.target.value;
    let yearStr = year + '-01-01';
    let newinputs = inputs;
    newinputs.mindate = dateFormat(yearStr, 'dd-mm-yyyy');
    setInputs(newinputs);
  };

  const tagChange = (e) => {
    setNewTag(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      // matcha.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      try {
        const refreshToken = sessionStorage.getItem('refreshtoken');
        if (refreshToken) {
          // console.log(inputs);
          const response = await axiosApiInstance.post('/filter/', {
            preference,
            maxdistance: parseInt(maxdistance * 1000) /* .toString() */,
            //maxdistance:(parseInt(maxdistance * 1000),
            mindate: inputs.mindate,
            maxdate,
            tags: newTags,
            limit,
            orderby,
          });

          if (response.data.status === 'success') {
            setMatches(response.data.data.users);
            localStorage.setItem('match', JSON.stringify(response.data.data.users));
            // console.log(response.data.data.users);
          }
        } else return;
      } catch (err) {
        // setErrors(err.response.data.validation);
        // console.log(err.response.data);
      }
    };
    // if (inputsSet) {
    setInputsSet(false);
    setAction(false);
    return fetchData;
    // }
  }, [inputsSet, action]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        if (props?.isGetNext) {
          setInputs({ ...inputs, limit: '1' });
        }
        const response = await axiosApiInstance.post('/filter/', {
          preference,
          maxdistance: parseInt(maxdistance) * 1000 /* .toString() */,
          //maxdistance,
          mindate: inputs.mindate,
          maxdate,
          tags: newTags,
          limit,
          orderby,
        });
        let nInputs = {
          preference,
          maxdistance,
          //maxdistance,
          mindate: inputs.mindate,
          maxdate,
          tags: newTags,
          limit,
          orderby,
          age: ageState,
        };
        //SAVING
        // console.log('SAVING');
        localStorage.setItem('filtercontrols', JSON.stringify(nInputs));
        // console.log(nInputs.tags);
        // console.log('SAVING');
        if (response.data?.status === 'success') {
          setMatches(response.data?.data.users);
        }
      } else return;
    } catch (err) {
      console.error(err.message);
    }
  };

  const addNewTags = (e) => {
    e.preventDefault();

    const list = [...newTags];
    if (newTag != '') {
      list.push(newTag);
    }
    setNewTags(list);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="filter controls"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        style={{
          fontSize: 20,
        }}
      >
        Filter
        <TuneIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Tooltip title="Close">
          <IconButton sx={{ float: 'right', marginRight: 1 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <Box
          sx={{
            display: 'flex',
            padding: 4,
            width: '100%',
            maxWidth: 345,
          }}
        >
          <Grid align="left">
            <form onSubmit={onSubmitForm}>
              <Grid item>
                <Typography style={{ marginBottom: 5, fontWeight: 'bold', textAlign: 'left' }}>
                  Show me
                </Typography>
                <ToggleButtonGroup
                  size="small"
                  color="primary"
                  value={preference}
                  exclusive
                  onChange={(e) => onChange(e)}
                  aria-label="Platform"
                  sx={{ marginBottom: 2 }}
                  style={{ width: '100%' }}
                >
                  <ToggleButton style={{ width: '33.3%' }} name="preference" value="male">
                    Male
                  </ToggleButton>
                  <ToggleButton style={{ width: '33.3%' }} name="preference" value="female">
                    Female
                  </ToggleButton>
                  <ToggleButton style={{ width: '33.3%' }} name="preference" value="both">
                    Both
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Divider style={{ marginBottom: 5 }} />
              <Grid item>
                <Typography style={{ marginBottom: 5, fontWeight: 'bold', textAlign: 'left' }}>
                  Maximum distance
                </Typography>
                <Slider
                  aria-label="Custom marks"
                  defaultValue={100}
                  step={1}
                  name="maxdistance"
                  value={maxdistance}
                  onChange={(e) => onChange(e)}
                  min={1}
                  max={1000}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              </Grid>
              <Divider style={{ marginBottom: 5 }} />
              <Grid item>
                <Typography style={{ marginBottom: 5, fontWeight: 'bold', textAlign: 'left' }}>
                  Minimum age
                </Typography>
                <Slider
                  type="number"
                  aria-label="Custom marks"
                  defaultValue={50}
                  step={1}
                  min={16}
                  max={132}
                  name="mindate"
                  value={ageState}
                  onChange={(e) => handleAge(e)}
                  valueLabelDisplay="auto"
                  marks={agemarks}
                />
              </Grid>
              <Divider style={{ marginBottom: 5 }} />
              <Grid item>
                <Typography style={{ marginBottom: 5, fontWeight: 'bold', textAlign: 'left' }}>
                  Search Tags
                </Typography>

                <TextField
                  variant="outlined"
                  label="Filter Tags"
                  size="small"
                  type="text"
                  name="newTag"
                  value={newTag}
                  onChange={(e) => tagChange(e)}
                  className="form-control my-3"
                  inputProps={{ maxLength: 20 }}
                />
                <Button
                  type="add"
                  variant="contained"
                  onClick={addNewTags}
                  sx={{ float: 'right', mt: 0.2, mb: 2, mr: 1, marginLeft: 1 }}
                >
                  add
                </Button>
                <p></p>
                {newTags &&
                  newTags.map((tag, value) => {
                    return (
                      <Chip
                        key={value}
                        label={tag}
                        value={tag}
                        onDelete={(e) => removeUserTagsFromState(e, tag)}
                        deleteIcon={<CancelIcon />}
                        id={tag}
                        name={tag}
                      />
                    );
                  })}
              </Grid>
              <Grid item>
                <Box>
                  {can_change_limit === 'true' && (
                    <>
                      <Typography
                        style={{
                          marginTop: 5,
                          marginBottom: 5,
                          fontWeight: 'bold',
                          textAlign: 'left',
                        }}
                      >
                        Limit
                      </Typography>
                      <ToggleButtonGroup
                        style={{ width: '100%' }}
                        size="small"
                        label="Limit people"
                        color="primary"
                        value={limit}
                        name="limit"
                        exclusive
                        onChange={(e) => onChange(e)}
                      >
                        <ToggleButton style={{ width: '25%' }} name="limit" value="10">
                          10
                        </ToggleButton>
                        <ToggleButton style={{ width: '25%' }} name="limit" value="25">
                          25
                        </ToggleButton>
                        <ToggleButton style={{ width: '25%' }} name="limit" value="50">
                          50
                        </ToggleButton>
                        <ToggleButton style={{ width: '25%' }} name="limit" value="100">
                          100
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </>
                  )}
                </Box>
              </Grid>

              <Grid item>
                <Box>
                  <Typography
                    style={{ marginTop: 5, marginBottom: 5, fontWeight: 'bold', textAlign: 'left' }}
                  >
                    Sort by
                  </Typography>
                  <ToggleButtonGroup
                    style={{ width: '100%' }}
                    size="small"
                    color="primary"
                    value={orderby}
                    name="orderby"
                    exclusive
                    onChange={(e) => onChange(e)}
                  >
                    <ToggleButton style={{ width: '25%' }} name="orderby" value="age">
                      age
                    </ToggleButton>
                    <ToggleButton style={{ width: '25%' }} name="orderby" value="fame">
                      fame
                    </ToggleButton>
                    <ToggleButton style={{ width: '25%' }} name="orderby" value="distance">
                      distance
                    </ToggleButton>
                    <ToggleButton style={{ width: '25%' }} name="orderby" value="common tags">
                      tags
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: 2, float: 'right' }}
                className="btn btn-success btn-block"
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Box>
      </Menu>
    </>
  );
};

export default FilterControls;
