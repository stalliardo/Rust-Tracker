import { Box, Typography } from '@mui/material'
import React from 'react'

const UserNotAuthedModel = () => {
  return (
    <Box sx={{height: "100px"}}>
        <Typography variant='subtitle1'>Creating alert profiles allows you to track and catergorize player activity. This is restricted to registered users. Please select one of the following options.</Typography>
    </Box>
  )
}

export default UserNotAuthedModel