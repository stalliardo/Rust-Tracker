import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CircularIndicator from '../components/loadingIndicator/CircularIndicator';
import ServerPageContainer from '../components/serverPage/ServerPageContainer';
import { getServerById } from '../services/API/serverAPIs';

const Server = () => {
    const { serverId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        getServerById(serverId).then(response => {

            setData(response.data);
            // Then check...
                // is the user authed?
                // is there a server in the state with this id? where and when will this get set? When the userDoc is returneds
                // if so, get that server data so notes and alerts for this server can be displayed
        }).catch(e => {
            console.log("Error getting the server. Error: ", e);
            // navigate to index?
        }).finally(() => {
            setIsLoading(false);
        })
    }, [serverId]);


    if (isLoading) {
        return <CircularIndicator />
    } else {
        return <ServerPageContainer serverData={data}/>
    }
}

export default Server;