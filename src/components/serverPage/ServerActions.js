import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import RegisteredUserActions from './RegisteredUserActions'
import useAuth from '../../custom-hooks/useAuth';

const ServerActions = ({ data }) => {
    const { isAuthenticated } = useAuth();
    
    return (
        <Box>
            <Typography variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Registered user perks</Typography>
            <Typography variant="subtitle1">
                {!isAuthenticated ? "Registered users have access to more advanced features. Such as, adding a server to their favourites list, adding notes for a servers" +
                    "alerts for status changes, player count etc. Register now to activate these features and gain an advantage on the competition." : "As a Registered user you have access to more advanced " +
                    "features. Such as, creating alerts for a server, adding a server to your favourites list, player activity alerts and player profiles."
                }
            </Typography>
            {/* TODO decide whether to use a link or a large button */}
            {!isAuthenticated && <Link href="/auth" sx={{ textDecoration: "none" }}>Register</Link>}
            <Typography mt="20px" variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Socials</Typography>
            <Typography>Website: {data.attributes.details.rust_url ? <Box component="span"><Link sx={{ textDecoration: "none" }} target="_blank" rel="noopener" href={data.attributes.details.rust_url}>{data.attributes.details.rust_url}</Link></Box> : "Not Found!"}</Typography>
            <RegisteredUserActions serverData={data}/>
        </Box>
    )
};

export default ServerActions;