import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlertIcon from '@mui/icons-material/AddAlert';

const allowRowToRender = (key, disallowedKeys) => {
  let canRender = true;
  if (disallowedKeys?.length) {
    disallowedKeys.forEach((k) => {
      if (key === k) canRender = false;
    })
  }

  if (key === "id") canRender = false;

  return canRender;
}

const ExtendableTable = (props) => {
  const handleEditClicked = (row) => {
    props.handleEdit(row);
  }

  const handleDeleteClicked = (row) => {
    props.handleDelete(row);
  }

  const handleRowClick = (row) => {
    props.handleRowClicked(row);
  }

  const handleAlertClicked = (row) => {
    props.handleAlertClicked(row);
  }

  return (
    <TableContainer component={Paper} elevation={8}>
      <Table sx={{
        minWidth: 650,
        "td": { color: "", fontWeight: "bold", letterSpacing: "1px" },
        "th": { backgroundColor: "background.default", color: "primary.main" },
        "tr:not(:has(th)):hover": { cursor: "pointer", backgroundColor: "background.secondary" }

      }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "lightgrey" }}>
          <TableRow>
            {props.data.head.map((item, index) => (
              <TableCell key={index + "31"} align="left">{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={!props.rowClickingDisabled ? () => handleRowClick(row) : null}
            >
              {Object.keys(row).map((r, inx) => {
                return (
                  allowRowToRender(r, props.disallowedKeys) ? <TableCell key={inx + "41"}>{row[r]}</TableCell> : null
                )
              })}

              {(props.deleteButton || props.editButton || props.alertButton) &&
                <TableCell sx={{ width: "100px", zIndex: 2 }}>
                  {props.editButton && <IconButton color="primary" onClick={() => handleEditClicked(row)}><EditIcon /></IconButton>}
                  {props.deleteButton && <IconButton color='error' onClick={() => handleDeleteClicked(row)}> <DeleteIcon /> </IconButton>}
                  {props.alertButton && <Tooltip title="Add Alert"><IconButton color='primary' onClick={() => handleAlertClicked(row)}><AddAlertIcon /></IconButton></Tooltip>}
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExtendableTable;