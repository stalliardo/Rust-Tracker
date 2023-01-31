import { Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExtendableTable from '../components/table/ExtendableTable';

const AddedServers = () => {
  const servers = useSelector(state => state.user.servers);
  const navigate = useNavigate();

  console.log("servers = ", servers);

  const [tableData, setTableData] = useState({ head: ["Server name", "Notes added", ""], rows: [] });

  useEffect(() => {
    if (servers.length) {
      const rowData = [];

      servers.forEach((server) => {
        rowData.push({
          serverName: server.name,
          notesAdded: server.notes !== "" ? "True" : "False",
          id: server.id
        })
      });

      setTableData({...tableData, rows: rowData});

    }
  }, [servers]);

  const handleViewClicked = (row) => {
    navigate(`/server/${row.id}`);
  }

  const handleDeleteClicked = (row) => {
    console.log("delete clicked. Row = ", row);
  }

  return (
    <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
      <Typography variant='h4' color="primary">Saved Servers</Typography>
      {
        servers.length > 0 ?
          <ExtendableTable 
            data={tableData} 
            viewButton={true} 
            viewButtonTooltipText="View server"
            handleViewClicked={handleViewClicked}
            deleteButton={true} 
            deleteButtonTooltipText="Delete server"
            handleDelete={handleDeleteClicked}
            rowClickingDisabled={true}
            /> :
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
