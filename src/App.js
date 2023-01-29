import './App.css';

import { useMemo, useEffect } from 'react';

import { CircularProgress, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar/Navbar';

import { getPallete } from './theme/Theme';
import { getUserData, noUserFound } from './features/user/userSlice';

const App = () => {
  
  const mode = useSelector(state => state.theme.colorMode);
  const theme = useMemo(
    () =>
      createTheme(getPallete(mode)),
    [mode],
  );

  console.log("theme = ", theme);

  const userDoc = useSelector((state) => state.user);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!userDoc.data) {
          dispatch(getUserData(user.uid)).unwrap().catch((e) => {
            // TODO
          })
        } 
      } else {
        dispatch(noUserFound())
      }
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Container>
        <div className="App">
          {
            userDoc.isLoadingUserData ? <Container sx={{ mt: "100px" }}><CircularProgress /></Container> :
              <Outlet />
          }
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;