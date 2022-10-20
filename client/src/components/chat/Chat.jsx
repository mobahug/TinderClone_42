import NavBarTop from '../subcomponents/NavBarTop';
import NavBarBottom from '../subcomponents/NavBarBottom';
import ChatBox from './ChatBox';

import React from 'react';
import { motion } from 'framer-motion';

const GetNextMatch = (props) => {
  let id = window.location.pathname.slice(
    window.location.pathname.lastIndexOf('/') + 1,
    window.location.pathname.length
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <NavBarTop />
      <ChatBox id={id} />
      <NavBarBottom />
    </motion.div>
  );
};
export default GetNextMatch;
