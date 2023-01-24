import './App.css';

import { useMemo, useState } from 'react';

import { CircularProgress, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar/Navbar';

import { getPallete } from './theme/Theme'; // <- FIX
import ThemeExamples from './theme/ThemeExamples';

const App = () => {
  const mode = useSelector(state => state.theme.colorMode);

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode
  //       }
  //     }),
  //   [mode],
  // );

  const theme = useMemo(
    () =>
      createTheme(getPallete(mode)),
    [mode],
  );

  // const userDoc = useSelector((state) => state.user);
  const user = {
    isLoadingUserData: false
  }
  const auth = getAuth();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       if (!userDoc.currentUser) {
  //         dispatch(getUserData(user.uid)).unwrap().catch((e) => {
  //           // TODO
  //         })
  //       } 
  //     } else {
  //       dispatch(noUserFound())
  //     }
  //   })
  // }, [userDoc])

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <div className="App">

       <ThemeExamples />
        {
          user.isLoadingUserData ? <Container sx={{ mt: "100px" }}><CircularProgress style={{ color: "blue" }} /></Container> :
            <Outlet />
        }
      </div>
    </ThemeProvider>
  );
}

export default App;