import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CssBaseline from '@mui/material/CssBaseline';


const bottomNavHeight = '56px';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
  <React.Fragment>
    <ThemeProvider theme={darkTheme}>
      <Box>
        <CssBaseline />
        <Box
          m={3} paddingBottom={bottomNavHeight}
        />
          <BottomNavigation
            sx={{ position: 'fixed', bottom: 0, width: 1.0 }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <Link sx={{marginTop: 2}} href="/Browse" variant="body2">
              {<BottomNavigationAction icon={<RestoreIcon />} />}
            </Link>
            <Link sx={{marginTop: 2}} href="/match" variant="body2">
              {<BottomNavigationAction icon={<FavoriteIcon />} />}
            </Link>
            <Link sx={{marginTop: 2}} href="/Browse" variant="body2">
              {<BottomNavigationAction icon={<FmdGoodIcon />} />}
            </Link>
          </BottomNavigation>
      </Box>
    </ThemeProvider>
  </React.Fragment>
  );
}
