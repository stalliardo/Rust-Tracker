import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        colorMode: "dark"
    },
    reducers: {
        toggleColorMode: (state) => {
            state.colorMode = state.colorMode === "dark" ? "light" : "dark";
        },
    },
    
})

export const { toggleColorMode} = themeSlice.actions;

export default themeSlice.reducer;