import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import RegisteredUserActions from './RegisteredUserActions'

const ServerActions = ({data}) => {
    return (
        <Box>
            <Typography variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Registered user perks</Typography>
            <Typography variant="subtitle1">
                Registered users have access to more advanced features. Such as, adding a server to their favourites list, adding notes for a server,
                alerts for status changes, player count etc. Register now to activate these features and gain an advantage on the competition.
            </Typography>
            {/* TODO decide whether to use a link or a large button */}
            <Link href="/auth" sx={{textDecoration: "none"}}>Register</Link>
            <Typography mt="20px" variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Socials</Typography>
            <Typography>Website: {data.attributes.details.rust_url ? <Box component="span"><Link sx={{textDecoration: "none"}} href={data.attributes.details.rust_url}>{data.attributes.details.rust_url}</Link></Box> : "Not Found!"}</Typography>
            <RegisteredUserActions />
        </Box>
    )
};

export default ServerActions;