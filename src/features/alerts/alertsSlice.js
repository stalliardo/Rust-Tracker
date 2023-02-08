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

       
    },
    // extraReducers: (builder) => {
    //     builder.addCase(signUpUser.pending, (state) => {
    //         state.isLoading = true;
    //     });

    // }
})

export const { setAlerts } = alertsSlice.actions;


export default alertsSlice.reducer