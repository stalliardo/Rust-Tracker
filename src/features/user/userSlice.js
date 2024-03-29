import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signUpUserWithEmailAndPassword, getUserDoc, logUserOut, signInUserWithEmailAndPassword } from '../../services/database/auth';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        servers: [],
        isLoading: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },

        noUserFound: (state, action) => {
            state.isLoadingUserData = false;
        },

        setGangId: (state, action) => {
            state.data = {...state.data, gangId: action.payload}
        },

        addServerToArray: (state, action) => {            
            state.servers.push(action.payload);
        },

        removeServer: (state, action) => {
            state.servers = state.servers.filter(server => server.id !== action.payload);
        },

        updateNotes: (state, action) => {
            const index = state.servers.findIndex(server => server.id === action.payload.serverId);
            if(index >=0 ) {
                state.servers[index].notes = action.payload.notes
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpUser.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });

        builder.addCase(signUpUser.rejected, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(signIn.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.servers = action.payload.serverData;
            delete action.payload.serverData;
            state.data = action.payload;
        });        
    }
})

export const { setUser, noUserFound, addServerToArray, removeServer, updateNotes } = userSlice.actions;

export const signUpUser = createAsyncThunk(
    "user/signUpUser",
    async (formData) => {

        try {
            const credential = await signUpUserWithEmailAndPassword(formData);
            const serializedUser = {                
                name: formData.firstName + " " + formData.lastName,
                firstName: formData.firstName,
                lastName: formData.lastName,
                username: formData.username,
                email: formData.email,
                uid: credential.user.uid
            }

            return serializedUser;
        } catch (error) {
            throw error;
        }
    }
);

export const signIn = createAsyncThunk(
    "user/signIn",
    async (formData) => {
        try {
            await signInUserWithEmailAndPassword(formData);
        } catch (error) {
            throw error;
        }
    }
);

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async (userId) => {
        try {
            const userData = await getUserDoc(userId);
            return userData;
        } catch (error) {
            throw (error);
        }
    }
)

export const logOut = createAsyncThunk(
    "user/logOut",
    async () => {
        try {
            await logUserOut();
        } catch (error) {
            throw (error);
        }
    }
)

export default userSlice.reducer