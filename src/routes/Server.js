import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getServerById } from '../services/API/serverAPIs';

const Server = () => {
    const { serverId } = useParams();

    useEffect(() => {
        getServerById(serverId).then((response) => {
            console.log("response = ", response);
        })
    }, [serverId]);


    return (
        <div>Hi, im the server route. Pass the server id to me via a query param and ill get the data for that server from the API</div>
    )
}

export default Server