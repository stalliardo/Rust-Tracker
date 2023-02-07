import { Box, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

const AddAlert = () => {
    const params = useParams();

    const playerId = params.playerId;
    const urlParams = new URLSearchParams(document.location.search);
    const playerName = urlParams.get("playerName");
    const serverId = urlParams.get("serverId");
    const serverName = urlParams.get("serverName");

    // console.log('playerId = ', playerId);
    // console.log('playerName = ', playerName);
    // console.log('serverId = ', serverId);
    // console.log('serverName = ', serverName);

    return (
        <Box>
            {/* <Typography variant="h5" color="primary">{`Add an alert for ${playerName} on the ${serverName} server`}</Typography> */}
            <Typography variant="h5" color="primary">
                Add an alert for 
                <Box component="span" color="white"> {playerName} </Box>
                on the server
                <Box component="span" color="white"> {serverName} </Box>
            </Typography>
        </Box>
    )
}

export default AddAlert;