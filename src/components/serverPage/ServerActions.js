import { Box, Typography, Link } from '@mui/material'
import React from 'react'
import RegisteredUserActions from './RegisteredUserActions'

const ServerActions = ({data}) => {
    return (
        <Box>
            <Typography variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Registered user perks</Typography>

            {/* TODO */}
            <Typography variant="subtitle1">
                Registered users have access to more advanced features. Such as, adding a server to their favourites list, adding notes for a server,
                alerts for status changes, player count etc. Register now to activate these features and gain an advantage on the competition.
            </Typography>
            {/* TODO decide whether to use a link or a large button */}
            <Link href="/auth">Register</Link>

            {/* TEST below on gaming pc link also needs to be dynamic*/}
            {/* <Link href="steam://connect/168.100.161.157:28015">Connect</Link> */}
            
            <Typography mt="20px" variant="h6" color="primary" sx={{ textDecoration: "underline" }}>Socials</Typography>

            <Typography>Website: {data.attributes.details.rust_url ? <Box component="span"><Link href={data.attributes.details.rust_url}>{data.attributes.details.rust_url}</Link></Box> : "Not Found!"}</Typography>

            <RegisteredUserActions />

        </Box>
    )
}

export default ServerActions