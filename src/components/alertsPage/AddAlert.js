import React, { useEffect, useState } from 'react';

import { Box, Typography, Paper, Container } from '@mui/material';
import LoadingButton from '../button/LoadingButton';
import SelectMenu from '../selectMenu/SelectMenu';

import { useNavigate, useParams } from 'react-router-dom';

import { createAlert } from '../../services/database/alerts';
import useAuth from '../../custom-hooks/useAuth';
import { useDispatch } from 'react-redux';
import { pushAlert } from '../../features/alerts/alertsSlice';

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
    const notificationOptions = ["Browser push notification", "Email", "SMS"];

    const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [permissionsGranted, setPermissionsGranted] = useState(false);

    const {id: userId} = useAuth();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleAlertTypeSelected = (e) => {
        setAlertType(e.target.value);
        
    }

    const handleNotificationTypeSelected = (e) => {
        setNotificationType(e.target.value);
    }

    const handleSaveAlert = () => {
        setIsLoading(true);
        const data = {userId, playerName, playerId, serverName, serverId, alertType, notificationType};
        createAlert(data).then((response) => {
            dispatch(pushAlert(response));
            navigate("/alerts");
        }).catch(e => {            
            if(e.message == "Error: Duplicate alert!"){
                setErrorMessage("Cannot create duplicate alerts!");
                setTimeout(() => {
                    setErrorMessage("");
                }, [3000]);
            }
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        if(notificationType === "Browser push notification") {
            setSaveButtonDisabled(notificationType === "" || alertType === "" || !permissionsGranted);
        } else {
            setSaveButtonDisabled(notificationType === "" || alertType === "");
        }
    }, [notificationType, alertType, permissionsGranted]);

    useEffect(() => {
        if(notificationType === "Browser push notification") {

            if(Notification.permission !== "granted") {
                Notification.requestPermission().then(permission => {
                     if(permission ===  "granted"){
                        setPermissionsGranted(true);
                     } else {
                        setPermissionsGranted(false);
                     }
                })
            } else {
                setPermissionsGranted(true);
            }
        }
    }, [notificationType])

    return (
        <Box>
            <Typography variant="h5" color="primary">
                Add an alert for
                <Box component="span" color="white"> {playerName} </Box>
                on the server
                <Box component="span" color="white"> {serverName} </Box>
            </Typography>
            <Container maxWidth="sm">
                <Box component={Paper} sx={{ textAlign: "left", padding: "20px", mt: "30px" }}>
                    <SelectMenu
                        value={alertType}
                        label="Alert Type"
                        name="alertType"
                        menuItems={alertTypeOptions}
                        handleChange={handleAlertTypeSelected}
                        required={true}
                    />
                    <SelectMenu
                        value={notificationType}
                        label="Notification Type"
                        name="notificationType"
                        menuItems={notificationOptions}
                        handleChange={handleNotificationTypeSelected}
                        required={true}
                        styles={{ mt: "20px" }}
                    />
                    {
                        errorMessage && <Typography variant='subtitle1' textAlign="center" mt="20px" color="error">{errorMessage}</Typography>
                    }
                    <LoadingButton text="Save Alert" clickHandler={handleSaveAlert} disabled={saveButtonDisabled} isLoading={isLoading} styles={{ mt: "20px", width: "100%" }} />
                </Box>
            </Container>
        </Box>
    )
}

export default AddAlert;