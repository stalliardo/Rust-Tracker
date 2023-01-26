import React from 'react';

import { Typography } from '@mui/material';

const PlayersContainer = () => {
    return (
        <Typography variant="h6" mt="80px" color="primary" textAlign="left" sx={{ textDecoration: "underline", height: "1000px" }}>
            Online Players
        </Typography>

        // Add the players list here in a table 
    )
}

export default PlayersContainer;