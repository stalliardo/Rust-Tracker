import { Container, Box, Paper, Typography, Grid } from '@mui/material'
import React from 'react'
import ServerDetails from './ServerDetails';

const ServerPageContainer = ({ serverData }) => {
    console.log("serverData passed in = ", serverData);
    return (
        <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
            <Typography variant="h4" textAlign="center">{serverData.attributes.name}</Typography>
            <Grid container>
                <Grid item sx={{ border: "1px solid red" }} xs={12} md={8}>
                    <ServerDetails data={serverData} />

                </Grid>
                <Grid item sx={{ border: "1px solid red" }} xs={12} md={4}>
                    <Typography variant="h6" color="primary" textAlign="center">Authed user perks</Typography>

                </Grid>
            </Grid>
        </Box>
    )
}

export default ServerPageContainer