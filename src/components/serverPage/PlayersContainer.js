import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import ExtendableTable from '../table/ExtendableTable';
import ExtendableModal from '../modal/extendableModal/ExtendableModal';

import { getActivePlayTime, sortByLongestPlayTimeFirst } from '../../utils/dateUtils';
import { useSelector } from 'react-redux';
import UserNotAuthedModel from '../modal/UserNotAuthedModel';
import { useNavigate } from 'react-router-dom';

const PlayersContainer = ({ data }) => {
    const [tableData, setTableData] = useState({ head: ["Name", "Play Time", ""], rows: [] });
    const [showNotAuthedModel, setShowNotAuthedModel] = useState(false);

    const navigate = useNavigate();

    const user = useSelector(state => state.user.data);
    

    useEffect(() => {
        const filteredData = [];
        data.forEach((element) => {
            if (element.type === "session") filteredData.push(element);
        });

        const formattedRows = [];
        filteredData.forEach((element) => {
            formattedRows.push({ id: element.relationships.player.data.id, name: element.attributes.name, playTime: getActivePlayTime(element.attributes.start) });
        });

        setTableData({ ...tableData, rows: sortByLongestPlayTimeFirst(formattedRows) });
    }, [data]);

    const handleAddAlert = (row) => {
        if (user) {
            // TODO
            console.log("user is authed");
        } else {
            setShowNotAuthedModel(true);
        }
    }

    const handleModalClosed = () => {
        setShowNotAuthedModel(false);
    }

    const handleNavigateToAuth = () => {
        navigate("/auth");
    }

    return (
        <Box mt="60px">
            {
                showNotAuthedModel &&
                <ExtendableModal 
                    modalClosed={handleModalClosed}
                    handleConfirm={handleNavigateToAuth}
                    confirmButtonText="Register or Sign in"
                    title="You are not signed in"
                    minHeight="200px"
                    >
                    <UserNotAuthedModel />
                </ExtendableModal>
            }
            <Typography variant="h6" color="primary" textAlign="left" sx={{ textDecoration: "underline" }}>
                Online Players
            </Typography>
            <Box mt="10px" sx={{ minHeight: "200px", paddingBottom: "60px" }}>
                {
                    data.length > 0 ? <ExtendableTable data={tableData} alertButton={true} handleAlertClicked={handleAddAlert} rowClickingDisabled={true} />
                        : <Typography variant="h5" color="primary" textAlign="center">0 players online</Typography>
                }
            </Box>
        </Box>
    )
}

export default PlayersContainer;