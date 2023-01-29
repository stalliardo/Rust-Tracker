import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import ExtendableTable from '../table/ExtendableTable';
import { getActivePlayTime, sortByLongestPlayTimeFirst } from '../../utils/dateUtils';

const PlayersContainer = ({ data }) => {
    const [tableData, setTableData] = useState({ head: ["Name", "Play Time", ""], rows: [] });

    useEffect(() => {
        const filteredData = [];

        data.forEach((element) => {
            if (element.type === "session") filteredData.push(element);
        });

        const formattedRows = [];
        filteredData.forEach((element) => {
            formattedRows.push({ id: element.relationships.player.data.id, name: element.attributes.name, playTime: getActivePlayTime(element.attributes.start) });
        });

        setTableData({ ...tableData, rows: sortByLongestPlayTimeFirst(formattedRows) });
    }, [data]);

    const handleAddAlert = (row) => {
        console.log("Row = ", row);
    }

    return (
        <Box mt="60px">
            <Typography variant="h6" color="primary" textAlign="left" sx={{ textDecoration: "underline" }}>
                Online Players
            </Typography>
            <Box mt="10px" sx={{minHeight: "200px", paddingBottom: "60px"}}>
                {
                    data.length > 0 ? <ExtendableTable data={tableData} alertButton={true} handleAlertClicked ={handleAddAlert} rowClickingDisabled={true}/>
                    : <Typography variant="h5" color="primary" textAlign="center">0 players online</Typography>
                }
            </Box>
        </Box>
    )
}

export default PlayersContainer;

// TODO:
    // Add a flag action to the rows 