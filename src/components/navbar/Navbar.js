import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '../../features/user/userSlice';

import { Box, Container, Paper, IconButton, Toolbar, Typography, Button } from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { toggleColorMode } from '../../features/theme/themeSlice';

import rustLogo from '../../images/rustLogo.png';

const desktopNavItems = ['About', 'Contact', 'Sign In', 'Sign Out'];

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);
  const colorMode = useSelector((state) => state.theme.colorMode);

  const toggleTheme = () => {
    dispatch(toggleColorMode())
  }

  const handleNavItemClicked = (link) => {
    if (link === "Sign Out") {
      dispatch(logOut());
      navigate("/");
    } else if (link === "Sign In") {
      navigate("auth");
    } else navigate(link);
  };

  const filterAuthenticatedNavItems = (navItem) => {
    if (user && navItem === "Sign In") return null;
    if (!user && navItem === "Sign Out") return null;
    return <Button key={navItem} sx={{ color: "white", fontSize: "12px" }} onClick={() => handleNavItemClicked(navItem)}>{navItem}</Button>
  }

  const handleLogoClicked = () => {
    console.log("logo clicked");
    navigate("/");
  }

  return (
    <Box component={Paper}>
      <Container maxWidth="lg">
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