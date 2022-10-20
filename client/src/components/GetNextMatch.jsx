import NavBarTop from './subcomponents/NavBarTop';
import NavBarBottom from './subcomponents/NavBarBottom';
import ViewMatch from './subcomponents/ViewMatch';
import Footer from './subcomponents/Footer';
import React from 'react';
import { MatchesContextProvider } from '../context/MatchesContext';

import { motion } from 'framer-motion';
const GetNextMatch = (props) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <NavBarTop />
      <MatchesContextProvider>
        <ViewMatch
          user={JSON.parse(localStorage.getItem('user'))}
          isFind={true}
          canLike={true}
          canBlock={true}
          isGetNext={true}
          limits="1"
        />
      </MatchesContextProvider>
      <Footer />
      <NavBarBottom />
    </motion.div>
  );
};
export default GetNextMatch;
