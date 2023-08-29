import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LoadingButton from '../button/LoadingButton';

import { searchServers } from '../../services/API/serverAPIs';
import SearchResultsContainer from './SearchResultsContainer';

const SearchContainer = () => {
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchIsLoading, setSearchIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [initiatedSearch, setInitiatedSearch] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        setSearchIsLoading(true);
        setInitiatedSearch(true);

        searchServers(searchTerm).then((response) => {
            setSearchResults(response.data.data);
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
                <TextField onChange={handleChange} fullWidth placeholder='eg, rusty moose'/>
                <LoadingButton type="submit" styles={{ mt: "10px", width: "100px" }} text="Search" isLoading={searchIsLoading} disabled={searchButtonDisabled} />
            </form>

            {
                initiatedSearch && !searchIsLoading ? <SearchResultsContainer searchResults={searchResults} /> : null
            }

        </Box>
    )
}

export default SearchContainer;