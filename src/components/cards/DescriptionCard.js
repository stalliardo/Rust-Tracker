import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const DescriptionCard = ({ title, text }) => {
    return (
        <Box sx={{ width: "300px", height: "180px", mt: "30px" }}>
            <Typography variant="h4" color="primary" sx={{ textDecoration: "underline" }}>{title}</Typography>
            <Typography variant="subtitle1">{text}</Typography>
        </Box>
    )
}

export default DescriptionCard