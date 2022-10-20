import NavBarTop from './subcomponents/NavBarTop';
import NavBarBottom from './subcomponents/NavBarBottom';
import ViewMatch from './subcomponents/ViewMatch';
import Footer from './subcomponents/Footer';

import { MatchesContextProvider } from '../context/MatchesContext';
import React, { useState, useEffect } from 'react';
import axiosApiInstance from './hooks/axiosPrivate';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

const ExploreSingle = (props) => {
  // const { matches, setMatches } = useContext(MatchesContext);
  const [match, setMatch] = useState({});
  const [tags, setTags] = useState({});
  const [canLike, setCanLike] = useState(true);
  const [canBlock, setCanBlock] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        // matcha.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        const response3 = await axiosApiInstance.post('/users/haveliked', { user_id: id });
        // console.log(response.data.data.users);
        if (response3.data.status === 'success') {
          if (response3.data.canlike.length === 0) {
            setCanLike(true);
          } else {
            setCanLike(false);
            navigate('/viewsingle/' + id);
          }
        }

        const response = await axiosApiInstance.post('/users/get/', {
          id,
          latitude: user.latitude,
          longitude: user.longitude,
        });
        const response2 = await axiosApiInstance.get('/tag/' + id);
        // console.log(response.data.data.users);
        if (response.data.status === 'success') {
          setMatch(response.data.data.users);
          setTags(response2.data.data.tags);
          // console.log(match);
          // console.log(tags);
        }

        const response4 = await axiosApiInstance.post('/users/haveblocked', { user_id: id });
        // console.log(response.data.data.users);
        if (response4.data.status === 'success') {
          // console.log(response4.data.canblock.length);
          if (response4.data.canblock.length === 0) {
            setCanBlock(true);
          } else {
            setCanBlock(false);
          }
          // console.log(canBlock);
        }
      } catch (err) {
        // console.log(err);
      }
    };
    let id = window.location.pathname.slice(
      window.location.pathname.lastIndexOf('/') + 1,
      window.location.pathname.length
    );
    if (id == user.id) {
      setMatch(false);
      return;
    } else {
      fetchData(id);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {match && canLike && (
        <>
          <NavBarTop />
          <MatchesContextProvider>
            <ViewMatch
              user={JSON.parse(localStorage.getItem('user'))}
              isFind={false}
              canLike={true}
              canBlock={true}
              isExplore={true}
              match={match}
            />
          </MatchesContextProvider>

          <Footer />
          <NavBarBottom />
        </>
      )}
    </motion.div>
  );
};
export default ExploreSingle;
