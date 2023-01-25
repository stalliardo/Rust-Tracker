import { Box, Typography, Link } from '@mui/material'
import React from 'react'

const ServerActions = ({data}) => {
    return (
        <Box>
            <Typography variant="h6" color="primary" textAlign="center" sx={{ textDecoration: "underline" }}>Registered user perks</Typography>

            {/* TODO */}
            <Typography variant="subtitle1">Registered users can save servers to their favourites list!</Typography>

            {/* TEST below on gaming pc link also needs to be dynamic*/}
            {/* <Link href="steam://connect/168.100.161.157:28015">Connect</Link> */}
            
            <Typography mt="20px" variant="h6" color="primary" textAlign="center" sx={{ textDecoration: "underline" }}>Socials</Typography>

            <Typography>Website: {data.attributes.details.rust_url ? <Box component="span"><Link href={data.attributes.details.rust_url}>{data.attributes.details.rust_url}</Link></Box> : "Not Found!"}</Typography>

        </Box>
    )
}

export default ServerActions