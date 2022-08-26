import React, { useState } from "react";
import BrowseMatches from "../components/BrowseMatches";
import BottomNavigation from "../components/BottomNavigation";
import SearchBars from "../components/SearchBars";
import UsersList from "../components/UsersList";

/* import Filter from "../components/filter";
 */

const Browse = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.currentTarget.checked);
  };

  return (
    <div>
      <SearchBars />
      <BrowseMatches />
      <UsersList checked={checked} onChange={handleChange} />
      <BottomNavigation />
    </div>
  );
};

export default Browse;
