import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography, Link } from '@mui/material';

import UserNotAuthedModel from '../modal/UserNotAuthedModel';
import ExtendableModal from '../modal/extendableModal/ExtendableModal';
import useModal from '../../custom-hooks/useModal';
import useAuth from '../../custom-hooks/useAuth';

import { addServer, deleteServer, updateServer } from '../../services/database/rustServers';
import { addServerToArray, removeServer, updateNotes } from '../../features/user/userSlice';

const RegisteredUserActions = ({ serverData }) => {
    const { isOpen, handleOpen, handleClose } = useModal();
    const { isAuthenticated, id: userId } = useAuth();

    const serverDataFromState = useSelector(state => state.user.servers.find(server => server.id === serverData.id));
    const [notes, setNotes] = useState(serverDataFromState.notes || ""); // This is the array not the singular item
    const [showEditNote, setShowEditNote] = useState(serverDataFromState.notes !== "");
    const [notesButtonDisabled, setNotesButtonDisabled] = useState(true);

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
        deleteServer({ userId, serverId: serverData.id }).then(() => {
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
            updateServer(userId, serverData.id, "notes", notes).then(() => {
                dispatch(updateNotes({ notes, serverId: serverData.id }));
                setShowEditNote(false);
            })
        } else {
            handleOpen();
        }
    };

    useEffect(() => {
        setNotesButtonDisabled(notes.length < 5 || notes === serverDataFromState.notes);
    }, [notes])

    const handleNavigateToAuth = () => {
        navigate("/auth");
    }

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    }

    const handleEditNote = () => {
        setShowEditNote(true);
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
                    serverDataFromState ?
                        <Button variant="contained" color='error' sx={{ width: "40%" }} onClick={handleRemoveServerFromList}>Remove from list</Button> :
                        <Button variant="contained" sx={{ width: "40%" }} onClick={handleAddServerToList}>Add to server list</Button>
                }
                <Button variant="contained" sx={{ width: "40%" }} onClick={handleCreateServerAlerts}>Create Alerts</Button>
            </Box>

            {
                showEditNote &&
                <Box>
                    <TextField fullWidth label="Add Note" sx={{ mt: "30px" }} value={notes} onChange={handleNotesChange} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: "10px" }}>
                        <Button variant="contained" sx={{ width: "40%", mt: "20px" }} onClick={handleSaveNote} disabled={notesButtonDisabled}>Save Note</Button>
                        <Button variant="contained" sx={{ width: "40%", mt: "20px" }} onClick={() => setShowEditNote(false)}>Cancel Edit</Button>
                    </Box>
                </Box>
            }
            {
                !showEditNote &&
                <Box>
                    <Typography variant='h6' color="primary" mt="20px">Notes</Typography>
                    <Typography variant='subtitle1'>{serverDataFromState.notes}</Typography>
                    <Button variant="contained" sx={{ width: "40%", mt: "10px" }} onClick={handleEditNote} >Edit Note</Button>
                </Box>
            }
        </Box>
    )
};

export default RegisteredUserActions;