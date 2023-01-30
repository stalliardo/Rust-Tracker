import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { signUpUserWithEmailAndPassword, getUserDoc, logUserOut, signInUserWithEmailAndPassword } from '../../services/database/auth';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        servers: [],
        isLoading: false,
        isLoadingUserData: false,
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

        builder.addCase(getUserData.pending, (state) => {
            state.isLoadingUserData = true;
        });

        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.isLoadingUserData = false;
            state.data = action.payload;
        });

        builder.addCase(getUserData.rejected, (state) => {
            state.isLoadingUserData = false;
        });
    }
})

export const { setUser, noUserFound, addServerToArray } = userSlice.actions;

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