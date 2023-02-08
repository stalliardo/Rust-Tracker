import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CircularIndicator from '../../loadingIndicator/CircularIndicator';

import { Button } from '@mui/material';

const buttonStyle = {
    width: "40%"
};

const ExtendableModal = (props) => {
    const [open, setOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
        props.modalClosed()
    }

    const handleConfirmClicked = () => {
        props.handleConfirm();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: "70%", md: "40%" },
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    borderRadius: "10px",
                    boxShadow: 24,
                    p: 4,
                    minHeight: props.minHeight || "400px"
                }}>
                    <Typography variant="h5" align="center" mb="20px">{props.title}</Typography>

                    {isLoading ? <CircularIndicator style={{ mt: "20px" }} /> :
                        props.children
                    }
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: "20px" }}>
                        <Button variant='contained' style={buttonStyle} onClick={handleConfirmClicked} disabled={props.confirmButtonDisabled}>{props.confirmButtonText}</Button>
                        <Button variant='contained' style={buttonStyle} onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
};

export default ExtendableModal;