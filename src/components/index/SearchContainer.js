import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { searchServers } from '../../services/API/serverAPIs';
import LoadingButton from '../button/LoadingButton';

const SearchContainer = () => {
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchIsLoading, setSearchIsLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        setSearchIsLoading(true);
        
        searchServers(searchTerm).then((response) => {
            console.log("response = ", response.data);
        }).catch(e => {
            console.log("error getting server. Error: ", e);
        }).finally(() => {
            setSearchIsLoading(false);
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
                <LoadingButton type="submit" styles={{mt: "10px", width: "100px"}} text="Search" isLoading={searchIsLoading} disabled={searchButtonDisabled}/>
            </form>
        </Box>
    )
}

export default SearchContainer