import { Box, TextField, Typography, Paper, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

const SearchContainer = () => {
    const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
    const [searcTerm, setSearchTerm] = useState(""); 

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        setSearchButtonDisabled(searcTerm.length < 3);
    }, [searcTerm]);

    return (
        <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
            <form onSubmit={onSubmit}>
                <Typography variant="subtitle1">Search Servers</Typography>
                <TextField onChange={handleChange} fullWidth />
                <Button variant="contained" sx={{ mt: "10px" }} disabled={searchButtonDisabled}>Search</Button>
            </form>
        </Box>
    )
}

export default SearchContainer