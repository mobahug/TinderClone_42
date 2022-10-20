import NavBarTop from './subcomponents/NavBarTop';
import NavBarBottom from './subcomponents/NavBarBottom';

import ViewMatch from './subcomponents/ViewMatch';
import React, { useState, useEffect } from 'react';
import { MatchesContextProvider } from '../context/MatchesContext';
import axiosApiInstance from './hooks/axiosPrivate';

import { motion } from 'framer-motion';

const ViewSingle = (props) => {
  // const { matches, setMatches } = useContext(MatchesContext);
  const [match, setMatch] = useState({});
  const [tags, setTags] = useState({});
  const [canLike, setCanLike] = useState(true);
  const [canBlock, setCanBlock] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      let id = window.location.pathname.slice(
        window.location.pathname.lastIndexOf('/') + 1,
        window.location.pathname.length
      );
      try {
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
          // console.log(response2.data.data.tags);
        }
        const response3 = await axiosApiInstance.post('/users/haveliked', { user_id: id });
        // console.log(response.data.data.users);
        if (response3.data.status === 'success') {
          if (response3.data.canlike.length === 0) {
            setCanLike(true);
          } else {
            setCanLike(false);
          }
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

    fetchData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <NavBarTop />
      <MatchesContextProvider>
        {match && canBlock && (
          <ViewMatch
            user={user}
            tags={tags}
            match={match}
            canLike={canLike}
            canBlock={canBlock}
            isFind={false}
            isSingle={true}
            isGetNext={false}
            isExplore={false}
          />
        )}
      </MatchesContextProvider>
      <NavBarBottom />
    </motion.div>
  );
};
export default ViewSingle;
