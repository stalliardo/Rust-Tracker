import { Box, Typography, Paper } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../elements/PageContainer';

const ViewAlerts = () => {
  const alerts = useSelector(state => state.alerts.data);

  return (
    // <Box component={Paper} sx={{ textAlign: "left", padding: "20px", mt: "30px" }}>
    //   <Typography>{alerts.length ? "you have laerts" : "You have no laetsr"}</Typography>
    // </Box>

    <PageContainer>
      Some content is here
    </PageContainer>

  )
}

export default ViewAlerts