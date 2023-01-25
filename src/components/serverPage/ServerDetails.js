import React, { useEffect, useState } from 'react';

import { Typography, Box, Paper, Link } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const ServerDetails = ({ data }) => {
    const [rows, setRows] = useState([]);

    const formatRowELements = (row) => {
        if (row.item === "Website") {
            return <Link href={row.value}>{row.value}</Link>
        } else if (row.item === "Status") {
            return <Box component="span" sx={{ color: row.value === "online" ? "lightgreen" : "red" }}>{row.value}</Box>
        } else {
            return row.value;
        }
    }

    useEffect(() => {
        const formattedRows = [
            { item: "Rank", value: data.attributes.rank },
            { item: "Player Count", value: data.attributes.players },
            { item: "Address", value: data.attributes.adderess || `${data.attributes.ip}:${data.attributes.port}` },
            { item: "Status", value: data.attributes.status },
            // { item: "Distance", value:  }, TODO or not?
            { item: "Country", value: data.attributes.country },
            { item: "Average FPS", value: data.attributes.details.rust_fps_avg },
            { item: "PVE", value: data.attributes.details.pve ? "true" : "false" },
            { item: "Website", value: data.attributes.details.rust_url },
        ];

        setRows(formattedRows);
    }, [data]);

    return (
        <Box >
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 280 }} aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.item}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography fontWeight="bold">{row.item}</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    {
                                        formatRowELements(row)
                                    }
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};

export default ServerDetails;

