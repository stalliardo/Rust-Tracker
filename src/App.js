import './App.css';

import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

function App() {

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
    <div className="App">
      {
        user.isLoadingUserData ? <Container sx={{ mt: "100px" }}><CircularProgress style={{ color: "blue" }} /></Container> :
          <Outlet />
      }
      {/* <div className='footer'>
        <Footer />
      </div> */}
    </div>
  );
}

export default App;