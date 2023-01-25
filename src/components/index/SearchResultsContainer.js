import { Box, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import ExtendableTable from '../table/ExtendableTable';

const tableData = {
    head: ["Rank", "Name", "Players", "Address", "Location"],
    rows: [
        { id: "testid1", rank: "300", name: "Tataris solo duo trio", players: "190/300", address: "192.168.0.1:2209", location: "UK"},
        { id: "testid2", rank: "500", name: "Tataris solo duo trio", players: "19/300", address: "192.168.0.1:2209", location: "UK"},
        { id: "testid3", rank: "320", name: "Tataris solo duo trio", players: "132/300", address: "192.168.0.1:2209", location: "UK"},
    ]
}

const SearchResultsContainer = ({ searchResults }) => {
    const [tableData, setTableData] = useState({head: ["Rank", "Name", "Players", "Address", "Location"], rows: []}); // TODO -> make this a custom hook as this is performed often
    const handleRowClicked = (row) => {
        // TODO
        console.log("Row clicked from parent. Row data = ", row);
    }

    const formattedData = [];

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