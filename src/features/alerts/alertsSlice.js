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
            // how to update an item in an array...
            // find the index then use that to chnage it

            console.log("action data = ", action.payload);
            const index = state.data.findIndex(item => item.id === action.payload.id);

            if(index >= 0) {
                state.data[index].alertType = action.payload.alertType
                state.data[index].notificationType = action.payload.notificationType
            }
            console.log("index = ", index);
        }

       
    },
    // extraReducers: (builder) => {
    //     builder.addCase(signUpUser.pending, (state) => {
    //         state.isLoading = true;
    //     });

    // }
})

export const { setAlerts, updateAlertItem } = alertsSlice.actions;


export default alertsSlice.reducer