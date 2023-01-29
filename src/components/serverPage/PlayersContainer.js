import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import ExtendableTable from '../table/ExtendableTable';

const PlayersContainer = ({ data }) => {
    const [tableData, setTableData] = useState({ head: ["Name", "Play Time"], rows: [] });

    useEffect(() => {
        const filteredData = [];
        console.log("datta = ", data);

        data.forEach((element) => {
            if (element.type === "session") filteredData.push(element);
        });

        const formattedRows = [];

        filteredData.forEach((element) => {
            console.log("Filtred data = ", element);
            formattedRows.push({ name: element.attributes.name, playTime: "TODO" })
        });

        setTableData({ ...tableData, rows: formattedRows });

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