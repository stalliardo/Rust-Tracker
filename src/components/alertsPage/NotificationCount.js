import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../custom-hooks/useAuth';
import { setAlertNotifications } from '../../features/user/userSlice';
import { getAlertNotifications } from '../../services/database/user';

const NotificationCount = () => {
  const notifications = useSelector(state => state.user.alertNotifications);
  const { id } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && !notifications.length) {
      getAlertNotifications(id).then((res) => {
        dispatch(setAlertNotifications(res));
      })
    }
  }, []);

  const onViewAlerts = () => {
    console.log("view clicked");
    // TODO navigate to the view alerts section
    navigate("view");
  }

  return (
    <Box textAlign="right">
      <Typography variant='subtitle1' sx={{":hover": {cursor: "pointer"}}} onClick={onViewAlerts}>You have <Box component="span" color={notifications.length ? "lightgreen" : "white"}>{notifications.length}</Box> notifications</Typography>
    </Box>
  )
}

export default NotificationCount;

// TODO
  // Format the text to show notifications have been added