import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Box, Container, Paper, IconButton, Toolbar, Typography } from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { toggleColorMode } from '../../features/theme/themeSlice';

import rustLogo from '../../images/rustLogo.png';

const desktopNavItems = ['About', 'Contact', 'Sign In', 'Sign Out'];

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const colorMode = useSelector((state) => state.theme.colorMode);

  const toggleTheme = () => {
    dispatch(toggleColorMode())
  }

  const filterAuthenticatedNavItems = (navItem) => {
    const activeLinkStyle = {
      textDecoration: "none",
      color: "orange"
    }

    const inActiveStyle = {
      color: colorMode === "dark" ? "white" : "black"
    }

    let formattedLink = "";

    switch(navItem) {
      case "Sign In" : {
        formattedLink = "auth"
        break;
      }
      case "Sign Out" : {
        formattedLink = "sign-out"
        break;
      }

      default: formattedLink = navItem;
    }

    if (user && navItem === "Sign In") return null;
    if (!user && navItem === "Sign Out") return null;

    return (
      <NavLink
        key={navItem}
        to={formattedLink}
        style={({ isActive }) =>
          isActive ? activeLinkStyle : inActiveStyle
        }
      >
        {navItem}
      </NavLink>
    )
  }

  const handleLogoClicked = () => {
    navigate("/");
  }

  return (
    <Box component={Paper}>
      <Container maxWidth="lg" disableGutters>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", height: "70px" }} >
            <Box sx={{ display: "flex", alignItems: "center", ":hover": { cursor: "pointer" } }} onClick={handleLogoClicked}>
              <img src={rustLogo} height={50} alt="rust icon" />
              <Typography
                variant="h6"
                component="div"
                letterSpacing="2px"
                color="primary"
                sx={{ flexGrow: 0, display: "block", ml: "20px" }}
              >
                Rust Tracker
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' }, mt: "8px" }}>
            {
              desktopNavItems.map((item) => (
                filterAuthenticatedNavItems(item)
              ))
            }
            {
              user &&
              <Typography fontWeight="bold" variant='subtitle1' display="inline" color="primary" ml="10px">{user.firstName}</Typography>
            }
          </Box>
          <Box sx={{ display: { xs: 'none', md: "block" }, flexGrow: 0 }}>
            <IconButton onClick={toggleTheme}>
              {colorMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  )
}

export default Navbar;