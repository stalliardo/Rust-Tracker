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
            console.log("response = ", response);
            setData(response.data.data);
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

export default Server