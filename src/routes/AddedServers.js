import { Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ExtendableTable from '../components/table/ExtendableTable';
import { deleteServer } from '../services/database/rustServers';
import useAuth from '../custom-hooks/useAuth';
import { removeServer } from '../features/user/userSlice';

const AddedServers = () => {
  const { id } = useAuth();
  const servers = useSelector(state => state.user.servers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

      setTableData({ ...tableData, rows: rowData });
    }
  }, [servers]);

  const handleViewClicked = (row) => {
    navigate(`/server/${row.id}`);
  }

  const handleDeleteClicked = (row) => {
    const confirmation = window.confirm(`Are you sure you want to delete this server: ${row.serverName}`);

    if (confirmation) {
      deleteServer({ userId: id, serverId: row.id }).then(() => {
        dispatch(removeServer(row.id));
      });
    }
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