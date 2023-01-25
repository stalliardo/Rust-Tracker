import { Box, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaginationContainer } from '../pagination/PaginationContainer';
import ExtendableTable from '../table/ExtendableTable';

const SearchResultsContainer = ({ searchResults }) => {
    const formattedData = [];
    const [tableData, setTableData] = useState({head: ["Rank", "Name", "Players", "Address", "Location"], rows: []});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const navigate = useNavigate();

    const handleRowClicked = (row) => {
        navigate(`/servers/${row.id}`);
    }

    const onPageChaned = (event, newPage) => {
        setPage(newPage);
    }

    const onRowsPerPageChanged = (event) => {
        setRowsPerPage(event.target.value);
    }
    
    useEffect(() => {
        const filteredResults = searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        console.log("filtered results = ", filteredResults);
        
        filteredResults.forEach((result) => {
            formattedData.push({
                id: result.id,
                rank: result.attributes.rank,
                name: result.attributes.name,
                players: `${result.attributes.players}/${result.attributes.maxPlayers}`,
                address: result.attributes.address || `${result.attributes.ip}:${result.attributes.port}`,
                location: result.attributes.country
            });
        });

        setTableData({...tableData, rows: formattedData});
    }, [searchResults, rowsPerPage, page]);

    return (
        <Box sx={{ mt: "30px" }}>
            <Typography variant="h5" color="primary">Results: {searchResults.length}</Typography>
            <ExtendableTable data={tableData} handleRowClicked={handleRowClicked}/>
            <PaginationContainer count={searchResults.length} page={page} rowsPerPage={rowsPerPage} handleChangePage={onPageChaned} handleChangeRowsPerPage={onRowsPerPageChanged}/>
        </Box>
    )
}

export default SearchResultsContainer;