import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CircularIndicator from '../components/loadingIndicator/CircularIndicator';
import { logOut } from '../features/user/userSlice';

const SignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logOut()).then(() => {
            navigate("/");
        });
    }, []);

    return (
        <Box mt="100px">
            <CircularIndicator />
            <Typography variant="h6" color="primary" mt="30px">Signing you out...</Typography>
        </Box>
    )
}

export default SignOut