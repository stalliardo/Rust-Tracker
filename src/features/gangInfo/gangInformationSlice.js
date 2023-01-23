import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createGangDoc, updateGangDoc, getGangData, deleteUser, editMemberDoc, search, addInvitation, checkInvitations } from "../../services/database/gangInformation";

export const gangInformationSlice = createSlice({
    name: "gangInformation",
    initialState: {
        id: "",
        creatorId: "",
        members: [],
        isEditing: false,
        usernameSearchResults: [],
        invitations: [],
    },

    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },

        filterInvitations(state, action) {
            state.invitations = state.invitations.filter(invitation => invitation.id !== action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createGangInformationDocument.fulfilled, (state, action) => {
            state.members.push({
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                memberType: action.payload.memberType,
                dayRate: action.payload.dayRate,
                skill: action.payload.skill,
                id: action.payload.userId
            });
            state.id = action.payload.gangId;
        },
            builder.addCase(getData.fulfilled, (state, action) => {
                state.members = action.payload || [];
                state.isLoading = false;
                state.creatorId = action.payload.creatorId;
                state.id = action.payload.id;
            }),

            builder.addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
            }),

            builder.addCase(updateGangInformationDocument.fulfilled, (state, action) => {
                const objectWithId = { ...action.payload.formData, id: action.payload.id };
                state.members.push(objectWithId);
            }),

            builder.addCase(deleteMember.fulfilled, (state, action) => {
                state.members = state.members.filter(member => member.id !== action.payload.userId);
            }),

            builder.addCase(editMember.pending, (state) => {
                state.isEditing = true;
            }),

            builder.addCase(editMember.fulfilled, (state, action) => {
                state.isEditing = false;

                const index = state.members.findIndex(member => member.id === action.payload.id);

                if (index > -1) {
                    state.members[index] = action.payload;
                }
            }),

            builder.addCase(editMember.rejected, (state) => {
                state.isEditing = false;
            }),

            builder.addCase(inviteUser.fulfilled, (state, action) => {
                state.invitations.push(action.payload);
            }),

            builder.addCase(getInvitations.fulfilled, (state, action) => {
                state.invitations = action.payload;
            })
        )
    }
})

export const { setIsLoading, filterInvitations } = gangInformationSlice.actions;

export const createGangInformationDocument = createAsyncThunk(
    "gangInformation/createGangInformationDocument",
    async (formData) => {
        try {
            const data = await createGangDoc(formData);
            return { ...formData, gangId: data.gangId, userId: data.gangId };

        } catch (error) {
            throw error;
        }
    }
)

export const updateGangInformationDocument = createAsyncThunk(
    "gangInformation/updateGangInformationDocument",
    async (data) => {
        try {
            const userId = await updateGangDoc(data);
            return { ...data, id: userId };
        } catch (error) {
            throw error;
        }
    }
)

export const editMember = createAsyncThunk(
    "gangInformation/editMember",
    async (data) => {
        try {
            await editMemberDoc(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const deleteMember = createAsyncThunk(
    "gangInformation/deleteMember",
    async (data) => {
        try {
            await deleteUser(data);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const getData = createAsyncThunk(
    "gangInformation/getData",
    async (gangId) => {
        try {
            const data = await getGangData(gangId);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const searchUsernames = createAsyncThunk(
    "gangInformation/searchUsernames",
    async (searchTerm) => {
        try {
            const data = await search(searchTerm);
            return data;
        } catch (error) {
            throw error;
        }
    }
)

export const inviteUser = createAsyncThunk(
    "gangInformation/inviteUser",
    async (data) => {
        try {
            const result = await addInvitation(data.recipientId, data.username, data.senderData);
            return result;
        } catch (error) {
            throw error;
        }
    }
)

export const getInvitations = createAsyncThunk(
    "gangInformation/getInvitations",
    async (gangId) => {
        try {
            const result = await checkInvitations(gangId);
            return result;
        } catch (error) {
            throw error;
        }
    }
)
export default gangInformationSlice.reducer;