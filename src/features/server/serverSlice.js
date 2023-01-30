import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addServer as add } from '../../services/database/rustServers';

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        servers: [],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addServer.fulfilled, (state, action) => {
            state.servers.push(action.payload);
        });
    }
})

// export const { } = serverSlice.actions;

export const addServer = createAsyncThunk(
    "server/addServer",
    async (data) => {
        try {
            await add(data);
            delete data.userId;
            return data;
        } catch (error) {
            console.log("Error =", error);
            throw error;
        }
    }
);

export default serverSlice.reducer