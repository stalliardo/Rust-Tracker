import { Container, Box, Paper, Typography, Grid } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react'
import ServerDetails from './ServerDetails';

const ServerPageContainer = ({ serverData }) => {
    const theme = useTheme();

    console.log("thteme = , theme", theme);

    return (
        <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
            <Typography variant="h4" textAlign="center">{serverData.attributes.name}</Typography>
            <Grid container mt="20px">
                <Grid item xs={12} md={6} sx={{ borderRight: {md: `1px solid ${theme.palette.primary.main}`}, paddingRight: "20px" }}>
                    <ServerDetails data={serverData} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" color="primary" textAlign="center">Authed user perks</Typography>

                </Grid>
            </Grid>
        </Box>
    )
}

export default ServerPageContainer