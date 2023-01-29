import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import ExtendableTable from '../table/ExtendableTable';
import { getActivePlayTime, sortByLongestPlayTimeFirst } from '../../utils/dateUtils';

const PlayersContainer = ({ data }) => {
    const [tableData, setTableData] = useState({ head: ["Name", "Play Time"], rows: [] });

    useEffect(() => {
        const filteredData = [];

        data.forEach((element) => {
            if (element.type === "session") filteredData.push(element);
        });

        const formattedRows = [];

        filteredData.forEach((element) => {
            formattedRows.push({ name: element.attributes.name, playTime: getActivePlayTime(element.attributes.start) });

        });

        setTableData({ ...tableData, rows: sortByLongestPlayTimeFirst(formattedRows) });
    }, [data]);

    return (
        <Box mt="60px">
            <Typography variant="h6" color="primary" textAlign="left" sx={{ textDecoration: "underline" }}>
                Online Players
            </Typography>
            <Box mt="10px">
                <ExtendableTable data={tableData} />
            </Box>
        </Box>
    )
}

export default PlayersContainer;