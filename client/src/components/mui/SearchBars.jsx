import React/* , { useState } */ from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Button from "@mui/material/Button";
// import MenuIcon from '@mui/icons-material/Menu';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import Avatar from '@mui/material/Avatar';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import { ThemeProvider, createTheme } from "@mui/material/styles";

import FilterListIcon from "@mui/icons-material/FilterList";
import Slider from "@mui/material/Slider";

import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";


// import userlist from "./UsersList";

function valuetext(value) {
  return `${value}age`;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function MenuAppBar() {
	// const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);
	// const [check, setCheckBox] = React.useState();

	// const handleChange = (event) => {
	// 	setAuth(event.target.checked);
	// };

	const [value, setValue] = React.useState([20, 37]);

	const handleFilterChange = (event, newValue) => {
		setValue(newValue);

	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// const open = Boolean(anchorEl);
	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };


  const [check, setCheck] = React.useState(false);
  const handleCheckBox = (event) => {
  setCheck(event.target.checked)
  };

  console.log(check);

/* 	const handleInputChange = (event) => {
		setCheckBox(event.target.value)
		console.log('here');
    console.log(event.target.ownerState, {checked: false});
	} */


	return (
		<React.Fragment>
		<Box sx={{ flexGrow: 1}}>
		<ThemeProvider theme={darkTheme}>
			<AppBar position="static" sx={{marginTop: 1}}>
			<Toolbar >
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				>
				</IconButton>
				<Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Filters
				</Typography>
				{/* auth &&  */(
				<div>
					<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					onClick={handleMenu}
					color="inherit"
					>
					<FilterListIcon />
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

						<Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Set your preferences
						</Typography>
						<MenuItem>
							<FormControl component="fieldset">
								<FormLabel component="legend">Show</FormLabel>
								<FormGroup align="center" aria-label="position" row>
									<FormControlLabel
									value="check"
									control={<Checkbox />}
									label="Guys"
									labelPlacement="top"
									onClick={handleCheckBox}
									/>
									<FormControlLabel
									value="top"
									control={<Checkbox />}
									label="Girls"
									labelPlacement="top"

									/>
									<FormControlLabel
									value="top"
									control={<Checkbox />}
									label="Both"
									labelPlacement="top"
									/>
								</FormGroup>
							</FormControl>
						</MenuItem>
						<Typography align="left" variant="h9" component="div" sx={{ flexGrow: 1 }}>
							Age Range
						</Typography>
						<MenuItem>
							<Box sx={{ marginTop: 0, width: 300 }}>
								<Slider
									min={16}
									max={99}
									getAriaLabel={() => 'Age range'}
									value={value}
									onChange={handleFilterChange}
									valueLabelDisplay="auto"
									getAriaValueText={valuetext}
								/>
							</Box>
						</MenuItem>
						<Typography sx={{marginLeft: 200, flexGrow: 1}} align="left" variant="h9" component="div">
							Distance
						</Typography>
						<MenuItem >
							<Slider
								defaultValue={5}
								aria-label="Default"
								valueLabelDisplay="auto" />
						</MenuItem>
						<MenuItem onClick={handleClose}>
							<Button variant="contained">Done</Button>
							<Button variant="outlined">Cancel</Button>
						</MenuItem>
					</Menu>
				</div>
				)}
			</Toolbar>
			</AppBar>
		</ThemeProvider>
		</Box>
		</React.Fragment>
	);
}
