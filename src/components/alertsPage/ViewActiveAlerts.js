import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import PageContainer from '../page/PageContainer';
import PageTitle from '../page/PageTitle';
import ExtendableTable from '../table/ExtendableTable';
import { truncateString } from '../../utils/stringUtils';
import useModal from '../../custom-hooks/useModal';
import EditAlertModal from '../modal/EditAlertModal';
import ExtendableModal from '../modal/extendableModal/ExtendableModal';
import { deleteAlert, updateAlert } from '../../services/database/alerts';
import { deleteAlertItem, updateAlertItem } from '../../features/alerts/alertsSlice';
import NotificationCount from './NotificationCount';

const ViewActiveAlerts = () => {
  const alerts = useSelector(state => state.alerts.data);
  const [tableData, setTableData] = useState({ head: ["Player Name", "Server Name", "Alert Type", "Notification Type", "Actions"], rows: [] });

  const { isOpen, handleOpen, handleClose } = useModal();

  const [selectedAlert, setSelectedAlert] = useState();
  const [editSaveButtonDisabled, setEditSaveButtonDisabled] = useState(true);
  const [editedValues, setEditedValues] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const formattedAlerts = [];

    alerts.forEach((alert) => {
      formattedAlerts.push({
        playerName: alert.playerName,
        serverName: truncateString(alert.serverName, 0, 30),
        alertType: alert.alertType,
        notificationType: alert.notificationType,
        id: alert.id
      })
    });

    setTableData({ ...tableData, rows: formattedAlerts })

  }, [alerts]);

  const handleEdit = (row) => {
    setSelectedAlert(row);
    handleOpen();
  }

  const handleEditValuesChanged = (values) => {    
    setEditSaveButtonDisabled(values.alertType === selectedAlert.alertType && values.notificationType === selectedAlert.notificationType);
    setEditedValues(values);
  }

  const handleConfirmEdit = () => {
    updateAlert(editedValues.alertType, editedValues.notificationType, selectedAlert.id).then(() => {
      dispatch(updateAlertItem({ id: selectedAlert.id, alertType: editedValues.alertType, notificationType: editedValues.notificationType }));
      handleClose();
    }).catch(e => {
      console.log("An error occured while updating the doc. Error: ", e);
    })
  }

  const handleDeleteAlert = (row) => {
    const confirmation = window.confirm("Are you sure you want to delete this alert?");

    if (confirmation) {
      deleteAlert(row.id).then(() => {
        dispatch(deleteAlertItem(row.id));
      })
    }
  }

  return (
    <Box>
      <PageTitle title="Your Active Alerts" color="primary" />
      {
        alerts.length ?
          <PageContainer>
            <NotificationCount />
            <ExtendableTable
              data={tableData}
              editButton={true}
              deleteButton={true}
              deleteButtonTooltipText="Delete Alert"
              handleDelete={handleDeleteAlert}
              editButtonTooltipText="Edit Alert"
              handleEdit={handleEdit}
              rowClickingDisabled={true}

            />
          </PageContainer>
          :
          <Typography variant="subtitle1">You have no alerts saved.</Typography>
      }

      {
        isOpen &&
        <ExtendableModal
          modalClosed={handleClose}
          handleConfirm={handleConfirmEdit}
          confirmButtonText="Save Alert"
          title={`Edit alert for ${selectedAlert.playerName} on the ${selectedAlert.serverName} server`}
          minHeight="200px"
          confirmButtonDisabled={editSaveButtonDisabled}
        >
          <EditAlertModal alertData={selectedAlert} onChange={handleEditValuesChanged} />
        </ExtendableModal>
      }
    </Box>

  )
}

export default ViewActiveAlerts;