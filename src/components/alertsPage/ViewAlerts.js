import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import PageContainer from '../page/PageContainer';
import PageTitle from '../page/PageTitle';
import ExtendableTable from '../table/ExtendableTable';

const ViewAlerts = () => {
  const alerts = useSelector(state => state.alerts.data);
  const [tableData, setTableData] = useState({ head: ["Player Name", "Server Name", "Alert Type", "Notification Type", "Actions"], rows: [] });


  useEffect(() => {
    console.log("alerts = ", alerts);

    const formattedAlerts = [];

    alerts.forEach((alert) => {
      formattedAlerts.push({
        playerName: alert.playerName,
        serverName: alert.serverName,
        alertType: alert.alertType,
        notificationType: alert.notificationType,
        id: alert.id
      })
    });

    setTableData({...tableData, rows: formattedAlerts})

  }, [alerts])

  // const alerts = [];

  return (

    <Box>
      <PageTitle title="Your Alerts" color="primary" />
      {
        alerts.length ?
          <PageContainer>
            <ExtendableTable data={tableData}/>
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
