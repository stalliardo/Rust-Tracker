import { Container, Box, Paper, Typography, Grid, Link } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';
import React from 'react'
import PlayersContainer from './PlayersContainer';
import ServerActions from './ServerActions';
import ServerDetails from './ServerDetails';

const ServerPageContainer = ({ serverData }) => {
    const theme = useTheme();
    return (
        <Box component={Paper} sx={{ textAlign: "left", padding: "20px" }}>
            <Typography variant="h4" textAlign="center">{serverData.attributes.name}</Typography>
            <Grid container mt="20px">
                <Grid item xs={12} md={6} sx={{ borderRight: {md: `1px solid ${theme.palette.primary.main}`}, paddingRight: "20px" }}>
                    <ServerDetails data={serverData} />
                </Grid>
                <Grid item xs={12} md={6} padding="0px 20px">
                    <ServerActions data={serverData} />

                    <PlayersContainer />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ServerPageContainer