import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'

const WelcomeDisplay = () => {
    return (
        // TODO
        <Box sx={{mb: "40px"}}>
            <Typography variant="h4" color="primary">Welcome to rust tracker. </Typography>
            <Typography>Stalk your in-game enemies using the power of the battlemetrics API.</Typography>
            <Typography>Warning! The API is in an unstable state. Some features might be buggy.</Typography>
        </Box>
    )
}

export default WelcomeDisplay