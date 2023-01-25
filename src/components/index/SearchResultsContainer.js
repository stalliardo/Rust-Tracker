import { Box, Typography } from '@mui/material';

import React from 'react';
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

    console.log("searchResults = ", searchResults);

    const handleRowClicked = (row) => {
        console.log("Row clicked from parent. Row data = ", row);
    }

    return (
        <Box sx={{ mt: "30px" }}>
            <Typography variant="h5" color="primary">Results:</Typography>
            <ExtendableTable data={tableData} handleRowClicked={handleRowClicked}/>
        </Box>
    )
}

export default SearchResultsContainer;

// Display the searchResultItems here using map



            {/* <Grid container sx={{ border: "1px solid red", display: "flex", justifyContent: "space-between" }}>
                <Grid item md={2}>
                    <Typography>Rank:</Typography>
                </Grid>
                <Grid item md={3}>
                    <Typography>Name:</Typography>
                </Grid>
                <Grid item md={2}>
                    <Typography>Players:</Typography>
                </Grid>
                <Grid item md={3}>
                    <Typography>Address:</Typography>
                </Grid>
                <Grid item md={1}>
                    <Typography>Location:</Typography>
                </Grid>
            </Grid> */}


            
            // {
            //     searchResults.length ? searchResults.map((item) => {
            //         return (
            //             <SearchresultsItem key={item.id} />
            //         )
            //     })
            //         : <Typography>No servers were found!</Typography>
            // }