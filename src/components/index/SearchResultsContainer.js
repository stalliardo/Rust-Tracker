import { Box, Typography } from '@mui/material';

import React from 'react';
import SearchresultsItem from './SearchresultsItem';

const SearchResultsContainer = ({ searchResults }) => {
    
    console.log("searchResults = ", searchResults);

    return (
        <Box sx={{ mt: "30px" }}>
            {/* Decide on the color of the results title */}
            <Typography variant="h5" color="primary">Results:</Typography>
            {
                searchResults.length ? searchResults.map((item) => {
                    return (
                        <SearchresultsItem key={item.id}/>
                    )
                })
                    : <Typography>No servers were found!</Typography>
            }
        </Box>
    )
}

export default SearchResultsContainer;

// Display the searchResultItems here using map