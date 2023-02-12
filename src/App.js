import './App.css';

import { useMemo, useEffect, useState } from 'react';

import { CircularProgress, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/navbar/Navbar';

import { getPallete } from './theme/Theme';
import { getUserData, noUserFound } from './features/user/userSlice';
import { checkForPlayerStatusUpdate, configureNotificationsForAlerts } from './services/backend/functions';

import { setAlerts, updateIsOnlineProperty } from './features/alerts/alertsSlice';
import { getAlerts } from './services/database/alerts';

const App = () => {
  const mode = useSelector(state => state.theme.colorMode);
  const theme = useMemo(
    () =>
      createTheme(getPallete(mode)),
    [mode],
  );

  const [isLoading, setIsLoading] = useState(true);

  const userDoc = useSelector((state) => state.user);
  const auth = getAuth();
  const dispatch = useDispatch();

  const alerts = useSelector(state => state.alerts.data);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!userDoc.data) {
          dispatch(getUserData(user.uid)).unwrap().then(() => {
            setIsLoading(false);
          }).catch((e) => {
            // TODO
          })
        }
      } else {
        dispatch(noUserFound())
        setIsLoading(false);
      }
    })
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (userDoc.data && !alerts.length) {
        getAlerts(userDoc.data.id).then((res) => {
          console.log('res from get alerts. ', res);
          
          dispatch(setAlerts(res));
        }).finally(() => {
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    // TODO -> only run this if the user has alerts saved
    if (userDoc.data && userDoc.data.username === "Admin" && alerts.length) {
      const interval = setInterval(() => {
        console.log('%cInvoking the refreshPlayerStatus function now...', "color: yellow;");
        checkForPlayerStatusUpdate(userDoc.data.id).then((response) => {
          if (response.data.data) {
            configureNotificationsForAlerts(response.data.data, alerts, userDoc.data.id, dispatch);
          }
        }).catch(e => {
          console.log("error getting the player status. Error: ", e);
        });
      }, 60000);

      return () => {
        console.log('interval cleared');
        clearInterval(interval);
      }
    }
  }, [alerts]);
  
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <CssBaseline />
      <Container>
        <div className="App">
          {
            isLoading ? <Container sx={{ mt: "100px" }}><CircularProgress /></Container> :
              <Outlet />
          }
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;