import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import ExtendableTable from '../table/ExtendableTable';
import ExtendableModal from '../modal/extendableModal/ExtendableModal';

import { getActivePlayTime, sortByLongestPlayTimeFirst } from '../../utils/dateUtils';
import { useSelector } from 'react-redux';
import UserNotAuthedModel from '../modal/UserNotAuthedModel';

const PlayersContainer = ({ data }) => {
    const [tableData, setTableData] = useState({ head: ["Name", "Play Time", ""], rows: [] });
    const [showNotAuthedModel, setShowNotAuthedModel] = useState(true);

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
        // Check for authed user...
        if (user) {
            console.log("user is authed");
        } else {
            console.log("user is not authed!!!");
        }
        console.log("Row = ", row);
    }

    const handleModalClosed = () => {
        setShowNotAuthedModel(false);
    }

    return (
        <Box mt="60px">
            {
                showNotAuthedModel &&
                <ExtendableModal 
                    modalClosed={handleModalClosed} 
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

// TODO:
    // Add a flag action to the rows - DONE
    // Handle alert clicks:
        // - Check if user is authed, if not display a model prompting a user to register or sign up