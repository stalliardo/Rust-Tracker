import React, { useEffect, useState} from 'react';
import { Box } from '@mui/material';
import SelectMenu from '../selectMenu/SelectMenu';

const EditAlertModal = ({ alertData, handleSetDisabledButton, onChange }) => {
    const [alertType, setAlertType] = useState(alertData.alertType);
    const alertTypeOptions = ["Player joins server", "Player leaves server"];

    const [notificationType, setNotificationType] = useState(alertData.notificationType);
    const notificationOptions = ["Browser push notification", "Email", "SMS"];

    const handleAlertTypeSelected = (e) => {
        setAlertType(e.target.value);
    }

    const handleNotificationTypeSelected = (e) => {
        setNotificationType(e.target.value);
    }

    useEffect(() => {
        onChange({alertType, notificationType});
    }, [alertType, notificationType])

    return (
        <Box>
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
        </Box>
    )
}

export default EditAlertModal;