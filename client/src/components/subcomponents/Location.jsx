import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import Button from '@mui/material/Button';
import '../App.css';
import axiosApiInstance from '../hooks/axiosPrivate';

const Location = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [location, setLocation] = useState([user.latitude, user.longitude]);
  const mapRef = useRef();

  const saveLocation = async (loc) => {
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        await axiosApiInstance.patch('/users', { latitude: loc[0], longitude: loc[1] });
      } else return;
    } catch (err) {
      console.error(err.message);
    }

    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const response3 = await axiosApiInstance.get('/users/profile');
        const user = response3.data.data.user;
        localStorage.setItem('user', JSON.stringify(user));
      } else return;
    } catch (err) {
      console.error(err.message);
    }
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        map.locate();
        setLocation([e.latlng.lat, e.latlng.lng]);
        saveLocation([e.latlng.lat, e.latlng.lng]);

        map.flyTo(e.latlng, map.getZoom());
      },
    });
  }

  const geolocation = () => {
    if (!navigator.geolocation) {
      // console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.latitude, position.coords.longitude]);
          saveLocation([position.coords.latitude, position.coords.longitude]);
          handleOnFlyTo([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // console.log('Unable to retrieve your location');
        }
      );
    }
  };
  function handleOnFlyTo(pos) {
    mapRef.current.flyTo(pos, 14, {
      duration: 2,
    });
  }

  return (
    <>
      <MapContainer center={location} zoom={12} scrollWheelZoom={true} ref={mapRef}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location} draggable={false}></Marker>
        <LocationMarker />
      </MapContainer>

      <Button
        sx={{ marginTop: 1, marginRight: 2, width: '100%' }}
        variant="contained"
        onClick={geolocation}
      >
        Get current location
      </Button>
    </>
  );
};

export default Location;
