import React from 'react';

import Container from '@mui/material/Container';
import DescriptionCard from '../cards/DescriptionCard';

const descriptions = [
    { title: "Alerts", text: "Get notified when a server goes offline, reaches a certain number of players, or a player joins." },
    { title: "Statistics", text: "See how many new and returning players are joining, number of hours spent in game, and when." },
    { title: "Monitoring", text: "We automatically track all servers and provide advanced tools and metrics for players." },
]

const DescriptionContainer = () => {
  return (
    <Container sx={{display: "flex", flexDirection: {xs: "column", md: "row"}, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", mt: "30px"}} disableGutters >
        {descriptions.map((item) => {
            return (
                <DescriptionCard key={item.title} title={item.title} text={item.text}/>
            )
        })}
    </Container>
  )
}

export default DescriptionContainer;