import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
    name: 'alerts',
    initialState: {
        data: [],
    },
    reducers: {
        setAlerts: (state, action) => {
            state.data = action.payload;
        },
        updateAlertItem: (state, action) => {
            const index = state.data.findIndex(item => item.id === action.payload.id);

            if(index >= 0) {
                state.data[index].alertType = action.payload.alertType
                state.data[index].notificationType = action.payload.notificationType
            }
        },
        updateIsOnlineProperty: (state, action) => {
            const index = state.data.findIndex(item => item.id === action.payload.alertId);
            if(index >=0 ){
                state.data[index].isOnline = action.payload.isOnline;
            }
        },
        deleteAlertItem: (state, action) => {
            state.data = state.data.filter(alert => alert.id !== action.payload);
        },
        pushAlert: (state, action) => {
            state.data.push(action.payload);
        }
    },
})

export const { setAlerts, updateAlertItem, deleteAlertItem, pushAlert, updateIsOnlineProperty } = alertsSlice.actions;


export default alertsSlice.reducer