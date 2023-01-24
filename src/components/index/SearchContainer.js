import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { searchServers } from '../../services/API/serverAPIs';

const SearchContainer = () => {
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); 

    const onSubmit = (e) => {
        e.preventDefault();
        
        searchServers(searchTerm).then((response) => {
            console.log("response = ", response.data);
        }).catch(e => {
            console.log("error getting server. Error: ", e);
        })
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        setSearchButtonDisabled(searchTerm.length < 3);
    }, [searchTerm]);

    return (
        <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
            <form onSubmit={onSubmit}>
                <Typography variant="subtitle1">Search Servers</Typography>
                <TextField onChange={handleChange} fullWidth />
                <Button variant="contained" type="submit" sx={{ mt: "10px" }} disabled={searchButtonDisabled}>Search</Button>
            </form>
        </Box>
    )
}

export default SearchContainer