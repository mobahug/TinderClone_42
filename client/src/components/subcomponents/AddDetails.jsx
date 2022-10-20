import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AuthContext from '../../context/AuthContext';
import dateFormat from 'dateformat';
import Divider from '@mui/material/Divider';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Stack from '@mui/material/Stack';
import axiosApiInstance from '../hooks/axiosPrivate';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddDetails({ user }) {
  const [inputs, setInputs] = useState({
    preference: '',
    gender: '',
    location: '',
    birthdate: '',
    bio: '',
    day: '',
    month: '',
    year: '',
  });

  const { setAuth } = useContext(AuthContext);
  const [userChanged, setUserChanged] = useState(false);
  const { preference, gender, birthdate, bio, day, month, year } = inputs;

  useEffect(() => {
    if (user) {
      setInputs({
        preference: user.preference,
        gender: user.gender,

        day: dateFormat(user.birthdate, 'dd'),
        month: dateFormat(user.birthdate, 'mm'),
        year: dateFormat(user.birthdate, 'yyyy'),
        bio: user.bio,
      });
    }
    setUserChanged(true);
  }, [user]);

  const getDifference = (dict) => {
    const difference = {};
    for (const [key, value] of Object.entries(user)) {
      if (dict[key] && value !== dict[key]) {
        difference[key] = dict[key];
      }
    }
    return difference;
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const check = async (e) => {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const response3 = await axiosApiInstance.get('/users/profile');
        if (response3.data.data.user.gender === null)
          toast.info('Please add gender and photos and at least one tag first!', {
            position: 'top-right',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        else return;
      } else return;
    };
    return check;
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    // matcha.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const body = getDifference({
      preference,
      gender,
      birthdate: year + '-' + month + '-' + day,
      bio,
    });
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const update = await axiosApiInstance.patch('/users/', {
          bio: body.bio,
          preference: body.preference,
          gender: body.gender,
          birthdate: body.birthdate,
        });
        if (update.request.status === 200) {
          toast.success('Details updated');
        }
      } else return;
    } catch (err) {
      console.error(err.message);
    }

    // localStorage.setItem('photos', JSON.stringify(response.data.photos));
    // localStorage.setItem('tags', JSON.stringify(response.data.tags));
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const response3 = await axiosApiInstance.get('/users/profile');
        user = response3.data.data.user;
        // console.log('|||||||||');
        // console.log(user);
        // console.log('|||||||||');
        localStorage.setItem('user', JSON.stringify(user));
        setAuth({ auth: true, user });
      } else return;
    } catch (err) {
      console.error(err.message);
    }

    setUserChanged(true);
  };

  const dayLoops = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];

  const monthLoops = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const yearLoops = [
    '1901',
    '1902',
    '1903',
    '1904',
    '1905',
    '1906',
    '1907',
    '1908',
    '1909',
    '1910',
    '1911',
    '1912',
    '1913',
    '1914',
    '1915',
    '1916',
    '1917',
    '1918',
    '1919',
    '1920',
    '1921',
    '1922',
    '1923',
    '1924',
    '1925',
    '1926',
    '1927',
    '1928',
    '1929',
    '1930',
    '1931',
    '1932',

    '1933',
    '1934',
    '1935',
    '1936',
    '1937',
    '1938',
    '1939',
    '1940',
    '1941',
    '1942',
    '1943',
    '1944',
    '1945',
    '1946',
    '1947',
    '1948',
    '1949',
    '1950',
    '1951',
    '1952',
    '1953',
    '1954',
    '1955',
    '1956',
    '1957',
    '1958',
    '1959',
    '1960',

    '1961',
    '1962',
    '1963',
    '1964',
    '1965',
    '1966',
    '1967',
    '1968',
    '1969',
    '1970',
    '1971',
    '1972',
    '1913',
    '1974',
    '1975',
    '1976',
    '1977',
    '1978',
    '1979',
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',

    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
  ];

  return (
    <Box
      sx={{
        padding: '10px',
        mb: '30px',
        border: 1,
        borderRadius: '10px',
        borderColor: '#D8D8D8',
      }}
    >
      <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
        <Typography align="left" component="h6" variant="h6">
          Gender
        </Typography>
        <Box align="center" sx={{ m: 1 }}>
          <ToggleButtonGroup
            sx={{ m: 1 }}
            orientation="horizontal"
            value={gender}
            name="gender"
            exclusive
            onChange={(e) => onChange(e)}
          >
            <ToggleButton name="gender" value="male">
              🧔 Male
            </ToggleButton>
            <ToggleButton name="gender" value="female">
              👧 Female
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Divider style={{ marginBottom: 5 }} />
        <Typography align="left" component="h6" variant="h6">
          Preference
        </Typography>
        <Box align="center" sx={{ m: 1 }}>
          <ToggleButtonGroup
            sx={{ m: 1 }}
            orientation="horizontal"
            value={preference}
            name="preference"
            exclusive
            onChange={(e) => onChange(e)}
          >
            <ToggleButton name="preference" value="male">
              🧔 Male
            </ToggleButton>

            <ToggleButton name="preference" value="female">
              👧 Female
            </ToggleButton>

            <ToggleButton name="preference" value="both">
              Both
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <br />
        <Divider style={{ marginBottom: 5 }} />
        <Typography align="left" component="h6" variant="h6">
          Birthday
        </Typography>
        <Box sx={{ paddingLeft: '18%' }}>
          <Stack spacing={3} direction="row">
            <Box sx={{ minWidth: 50 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Days
                </InputLabel>
                <NativeSelect id="day" name="day" value={day} onChange={(e) => onChange(e)}>
                  {dayLoops &&
                    dayLoops.map((dayLoop, value) => <option key={value}>{dayLoop}</option>)}
                </NativeSelect>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 50 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Month
                </InputLabel>
                <NativeSelect id="month" name="month" onChange={(e) => onChange(e)} value={month}>
                  {monthLoops &&
                    monthLoops.map((monthLoop, value) => <option key={value}>{monthLoop}</option>)}
                </NativeSelect>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 50 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Year
                </InputLabel>
                <NativeSelect id="year" name="year" value={year} onChange={(e) => onChange(e)}>
                  {yearLoops &&
                    yearLoops.map((yearLoop, value) => <option key={value}>{yearLoop}</option>)}
                </NativeSelect>
              </FormControl>
            </Box>
          </Stack>
        </Box>
        <br />
        <Box
          sx={{
            '& .MuiTextField-root': { m: 1, width: '34ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Divider style={{ marginBottom: 5 }} />
          <Typography align="left" component="h6" variant="h6">
            Tell about yourself
          </Typography>
          <TextField
            inputProps={{ maxLength: 500 }}
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
            multiline
            rows={4}
            placeholder="Here comes your bio..."
          />
        </Box>

        <Button type="submit" variant="contained" sx={{ float: 'right', mt: 3, mb: 2, mr: 1 }}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
