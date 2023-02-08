import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import PageContainer from '../page/PageContainer';
import PageTitle from '../page/PageTitle';

const ViewAlerts = () => {
  const alerts = useSelector(state => state.alerts.data);
  // const alerts = [];

  return (

    <Box>
      <PageTitle title="Your Alerts" color="primary" />
      {
        alerts.length ?
          <PageContainer>

          </PageContainer>
          :
          <Typography variant="subtitle1">You have no alerts saved.</Typography>
      }
    </Box>

  )
}

export default ViewAlerts;

// display the alerts in a table
// options will be edit
// clicking edit will load an edit modal and pass in the currebnt values
// Will display the players name, server name, alerty type, notification type
