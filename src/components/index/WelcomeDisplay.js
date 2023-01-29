import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react'

const WelcomeDisplay = () => {
    return (
        // TODO
        <Box sx={{mb: "40px"}}>
            <Typography variant="h4" color="primary">Welcome to rust tracker. </Typography>
            <Typography>Display some text here about the what the site does. Only Display if the user is not logged in.</Typography>
        </Box>
    )
}

export default WelcomeDisplay