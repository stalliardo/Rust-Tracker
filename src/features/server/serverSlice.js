import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addServer as add } from '../../services/database/rustServers';

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder.addCase(addServer.pending, (state) => {
            state.isLoading = true;
        });
    }
})

// export const { } = serverSlice.actions;

export const addServer = createAsyncThunk(
    "server/addServer",
    async (data) => {
        try {
            await add(data);

            // TODO - add the server to the state servers array
            
        } catch (error) {
            console.log("Error =", error);
            throw error;
        }
    }
);

export default serverSlice.reducer