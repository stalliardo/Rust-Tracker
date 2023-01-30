import React, { useState } from 'react';

import { Box, Button, TextField, Typography, Link } from '@mui/material';

import UserNotAuthedModel from '../modal/UserNotAuthedModel';
import ExtendableModal from '../modal/extendableModal/ExtendableModal';
import useModal from '../../custom-hooks/useModal';
import useAuth from '../../custom-hooks/useAuth';


import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
// import { addServer } from '../../features/server/serverSlice';

import { addServer } from '../../services/database/rustServers';

import { addServerToArray } from '../../features/user/userSlice';

const RegisteredUserActions = ({ serverData }) => {
    const { isOpen, handleOpen, handleClose } = useModal();
    const { isAuthenticated, id: userId } = useAuth();

    console.log('userid from alias = ', isAuthenticated);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddServerToList = () => {
        if (isAuthenticated) {
            const newServerData = { serverId: serverData.id, userId, serverName: serverData.attributes.name };
            addServer(newServerData).then(() => {
                delete newServerData.userId;
                dispatch(addServerToArray({ ...newServerData, notes: "" }))
            }).catch(e => {
                console.log('error from addserver = ', e);
            })
        } else {
            handleOpen();
        }
    };

    const handleCreateServerAlerts = () => {
        if (isAuthenticated) {
            // Create server alerts
        } else {
            handleOpen();
        }
    };

    const handleSaveNote = () => {
        if (isAuthenticated) {
            // Save server note
        } else {
            handleOpen();
        }
    };

    const handleNavigateToAuth = () => {
        navigate("/auth");
    }

    return (
        <Box sx={{ mt: "30px" }}>
            {
                isOpen &&
                <ExtendableModal
                    modalClosed={handleClose}
                    handleConfirm={handleNavigateToAuth}
                    confirmButtonText="Register or Sign in"
                    title="You are not signed in"
                    minHeight="200px"
                >
                    <UserNotAuthedModel />
                </ExtendableModal>
            }
            <Typography variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Server Actions</Typography>
            {/* TEST below on gaming pc, link also needs to be dynamic*/}
            <Link sx={{ display: "block", mt: "10px", textDecoration: "none" }} href="steam://connect/168.100.161.157:28015">Connect to sever</Link>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: "20px" }}>
                <Button variant="contained" sx={{ width: "40%" }} onClick={handleAddServerToList}>Add to server list</Button>
                <Button variant="contained" sx={{ width: "40%" }} onClick={handleCreateServerAlerts}>Create Alerts</Button>
            </Box>
            <TextField fullWidth label="Add Note" sx={{ mt: "30px" }} />
            <Button variant="contained" sx={{ width: "40%", mt: "20px" }} onClick={handleSaveNote}>Save Note</Button>
            <Typography mt="20px">TODO add notes here... in a max height container</Typography>
        </Box>
    )
};

export default RegisteredUserActions;

// TODO:
    // disable the add to server list button if the server is already in the list - 
    // get the users servers from the subcollection then add them to state.user.servers array - DONE