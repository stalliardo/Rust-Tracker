import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const NotificationCount = () => {
    const notifications = useSelector(state => state.user.alertNotifications); // wrong user.alertNotifications
  return (
    <Box textAlign="right">
        <Typography>{`You have ${notifications.length} notifications`}</Typography>
    </Box>
  )
}

export default NotificationCount