import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark"
    },
    typography: {
        fontFamily: [
            "Russo One",
            "Roboto",
        ],
        
        button: {
           letterSpacing: "2px"
        }
    },
    
})