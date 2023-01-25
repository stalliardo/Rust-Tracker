import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const RegisteredUserActions = () => {
    return (
        <Box sx={{ mt: "30px" }}>
            <Typography color="primary" mb="20px">Registered User Actions</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" sx={{ width: "40%" }}>Favourite</Button>
                <Button variant="contained" sx={{ width: "40%" }}>Create Alerts</Button>
            </Box>
            <TextField fullWidth label="Add Note" sx={{mt: "30px"}}/>
        </Box>
    )
}

export default RegisteredUserActions