import React from 'react';

import { Box, Button, TextField, Typography, Link } from '@mui/material';

const RegisteredUserActions = () => {
    return (
        <Box sx={{ mt: "30px" }}>
            <Typography variant="h6" color="primary" sx={{ textDecoration: "underline", mb: "10px" }}>Server Actions</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" sx={{ width: "40%" }}>Favourite</Button>
                <Button variant="contained" sx={{ width: "40%" }}>Create Alerts</Button>
            </Box>
            <TextField fullWidth label="Add Note" sx={{ mt: "30px" }} />
            <Button variant="contained" sx={{ width: "40%", mt: "20px" }}>Save Note</Button>
            {/* TEST below on gaming pc, link also needs to be dynamic*/}
            <Link sx={{display: "block", mt: "20px", textDecoration: "none"}} href="steam://connect/168.100.161.157:28015">Connect to sever</Link>
        </Box>
    )
};

export default RegisteredUserActions;