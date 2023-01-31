import { Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ExtendableTable from '../components/table/ExtendableTable';

const AddedServers = () => {
  const servers = useSelector(state => state.user.servers);

  console.log("servers = ", servers);

  const [tableData, setTableData] = useState({ head: ["Server name", "Notes added"], rows: [] });

  useEffect(() => {
    // Loop through the servers and set the table data

    if (servers.length) {
      const rowData = [];

      servers.forEach((server) => {
        console.log("Server itme = ", server);
        rowData.push({
          serverName: server.name,
          notesAdded: server.notes !== "",
          id: server.id
        })
      });

      setTableData({...tableData, rows: rowData});

    }
  }, [servers]);

  return (
    <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
      <Typography variant='h4' color="primary">Saved Servers</Typography>
      {
        servers.length > 0 ?
          <ExtendableTable data={tableData} /> :
          <Typography>Your saved servers will be displayed here.</Typography>
      }
    </Box>
  )
}

export default AddedServers;

// TODO
    // - Check the servers length
    // - Display message if not servers "You're saved servers will be displayed here"
    // - A title for the page "Saved Servers"
    // - Display servers in the extendableTable
    // - Rows will contain: server name, notes added bool, and actions: view and delete
    // - Fix the grey pixel error in the table head
