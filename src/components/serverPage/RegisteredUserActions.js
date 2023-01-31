import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography, Link } from '@mui/material';

import UserNotAuthedModel from '../modal/UserNotAuthedModel';
import ExtendableModal from '../modal/extendableModal/ExtendableModal';
import useModal from '../../custom-hooks/useModal';
import useAuth from '../../custom-hooks/useAuth';

import { addServer, deleteServer } from '../../services/database/rustServers';
import { addServerToArray, removeServer } from '../../features/user/userSlice';

const RegisteredUserActions = ({ serverData }) => {
    const { isOpen, handleOpen, handleClose } = useModal();
    const { isAuthenticated, id: userId } = useAuth();

    const serverDataFromState = useSelector(state => state.user.servers);
    const serverAlreadyAdded = serverDataFromState.find(server => server.id === serverData.id);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddServerToList = () => {
        if (isAuthenticated) {
            const newServerData = { serverId: serverData.id, userId, serverName: serverData.attributes.name };
                addServer(newServerData).then(() => {
                    delete newServerData.userId;
                    delete newServerData.serverId;
                    newServerData.id = serverData.id;
                    dispatch(addServerToArray({ ...newServerData, notes: "" }));
                }).catch(e => {
                    console.log('error from addserver = ', e);
                });
            
        } else {
            handleOpen();
        }
    };

    const handleRemoveServerFromList = () => {
        deleteServer({userId, serverId: serverData.id}).then(() => {
            dispatch(removeServer(serverData.id));
        }).catch(e => {
            console.log('Error deleting server. Error: ', e);            
        })
    }

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
                {
                    serverAlreadyAdded ? 
                        <Button variant="contained" color='error' sx={{ width: "40%" }} onClick={handleRemoveServerFromList}>Remove from list</Button> :
                        <Button variant="contained" sx={{ width: "40%" }} onClick={handleAddServerToList}>Add to server list</Button>
                }

                <Button variant="contained" sx={{ width: "40%" }} onClick={handleCreateServerAlerts}>Create Alerts</Button>
            </Box>
            <TextField fullWidth label="Add Note" sx={{ mt: "30px" }} />
            <Button variant="contained" sx={{ width: "40%", mt: "20px" }} onClick={handleSaveNote}>Save Note</Button>
            <Typography mt="20px">TODO add notes here... in a max height container</Typography>
        </Box>
    )
};

export default RegisteredUserActions;