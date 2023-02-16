import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { setAlertNotifications } from '../../features/user/userSlice';
import { getAlertNotifications } from '../../services/database/user';

const NotificationCount = () => {
  const notifications = useSelector(state => state.user.alertNotifications); // wrong user.alertNotifications
  const { id } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && !notifications.length) {
      getAlertNotifications(id).then((res) => {
        dispatch(setAlertNotifications(res));
      })
    }
  }, []);

  return (
    <Box textAlign="right">
      <Typography>{`You have ${notifications.length} notifications`}</Typography>
    </Box>
  )
}

export default NotificationCount;

// TODO
  // Format the text to show notifications have been added