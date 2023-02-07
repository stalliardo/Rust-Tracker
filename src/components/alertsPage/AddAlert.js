import { Box, Typography, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import SelectMenu from '../selectMenu/SelectMenu';

const AddAlert = () => {
    const params = useParams();

    const playerId = params.playerId;
    const urlParams = new URLSearchParams(document.location.search);
    const playerName = urlParams.get("playerName");
    const serverId = urlParams.get("serverId");
    const serverName = urlParams.get("serverName");

    const [alertType, setAlertType] = useState("");
    const alertTypeOptions = ["Player joins server", "Player leaves server"];

    const [notificationType, setNotificationType] = useState("");
    const notificationOptions = [ "Browser push notification", "Email", "SMS"];

    const handleAlertTypeSelected = (e) => {
        setAlertType(e.target.value);
    }

    const handleNotificationTypeSelected = (e) => {
        setNotificationType(e.target.value);
    }


    // console.log('playerId = ', playerId);
    // console.log('playerName = ', playerName);
    // console.log('serverId = ', serverId);
    // console.log('serverName = ', serverName);

    // const handleNotificationTest = () => {
    //     Notification.requestPermission().then(permission => {
    //         if(permission) {
    //             new Notification("Well hello there!")

    //         }
    //     })
    // }

    return (
        <Box>
            <Typography variant="h5" color="primary">
                Add an alert for
                <Box component="span" color="white"> {playerName} </Box>
                on the server
                <Box component="span" color="white"> {serverName} </Box>
            </Typography>
            <Box component={Paper} sx={{ textAlign: "left", padding: "20px", mt: "30px" }}>
                <SelectMenu
                    value={alertType}
                    label="Alert Type"
                    name="alertType"
                    menuItems={alertTypeOptions}
                    handleChange={handleAlertTypeSelected}
                    required={true}
                    styles={{ width: "50%" }}
                />

                <SelectMenu
                    value={notificationType}
                    label="Notification Type"
                    name="notificationType"
                    menuItems={notificationOptions}
                    handleChange={handleNotificationTypeSelected}
                    required={true}
                    styles={{ width: "50%", mt: "20px" }}
                />
            </Box>
        </Box>
    )
}

export default AddAlert;

// Form will need:
    // 1 - Select menu, label: What would you like to receive notifications about? Options: Player joins server, Player leaves server
    // 2 - Select Menu, label: How would you like to receive notifications?. Options: Email, sms, push, Browser. 