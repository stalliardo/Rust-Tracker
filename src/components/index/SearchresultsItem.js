import React from 'react';

import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const SpanElement = ({ text }) => {
  return <Box component="span" sx={{ color: "primary.main" }}>{text}</Box>
}

const SearchresultsItem = () => {
  const theme = useTheme();


  return (
    <Grid container sx={{ border: "1px solid red" }}>
      <Grid item md={2}>
        <Typography><SpanElement text="Rank:" /> 300</Typography>
      </Grid>
      <Grid item md={3}>
        <Box>
          <Typography>Tataris - Solo | Duo | Trio only</Typography>
          <Typography>Map: Custom map PVE: false</Typography>
        </Box></Grid>
      <Grid item md={2}>
        <Typography>32/200</Typography>
      </Grid>
      <Grid item md={3}>
        <Typography>168.100.161.157:28015</Typography>
      </Grid>
      <Grid item md={1}>
        <Typography>UK</Typography>
      </Grid>
    </Grid>
  )
}

export default SearchresultsItem;

// Needs to have:
    // 1 - the server rank
    // 2 - the server name / description -> Clicking this will go to the server/id route
    // 3 - some map details below that
    // 4 - players count
    // 5 - Address -> can i implement a connect option via this?
    // 6 - Location ie UK 76km

    // TODO remove this file