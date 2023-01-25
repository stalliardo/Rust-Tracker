import { Box, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import ExtendableTable from '../table/ExtendableTable';

const SearchResultsContainer = ({ searchResults }) => {
    const formattedData = [];
    const [tableData, setTableData] = useState({head: ["Rank", "Name", "Players", "Address", "Location"], rows: []});

    const handleRowClicked = (row) => {
        // TODO
        console.log("Row clicked from parent. Row data = ", row);
    }

    useEffect(() => {

        searchResults.forEach((result) => {
            formattedData.push({
                rank: result.attributes.rank,
                name: result.attributes.name,
                players: `${result.attributes.players}/${result.attributes.maxPlayers}`,
                address: result.attributes.address || `${result.attributes.ip}:${result.attributes.port}`,
                location: result.attributes.country
            });
        });

        setTableData({...tableData, rows: formattedData});
    }, [searchResults]);

    return (
        <Box sx={{ mt: "30px" }}>
            <Typography variant="h5" color="primary">Results: {searchResults.length}</Typography>
            <ExtendableTable data={tableData} handleRowClicked={handleRowClicked}/>
        </Box>
    )
}

export default SearchResultsContainer;