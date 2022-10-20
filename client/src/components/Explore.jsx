import React from 'react';
import Header from './subcomponents/NavBarTop';
import NavBarBottom from './subcomponents/NavBarBottom';
import BrowseMatch from './subcomponents/BrowseMatch';
import { MatchesContextProvider } from '../context/MatchesContext';
import Footer from './subcomponents/Footer';

import { motion } from 'framer-motion';
const Explore = (props) => {
  return (
    <>
      <Header />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <MatchesContextProvider>
          <BrowseMatch />
        </MatchesContextProvider>
        <Footer />
      </motion.div>
      <NavBarBottom />
    </>
  );
};
export default Explore;
