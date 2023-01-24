import { amber, deepOrange, grey, orange, red } from "@mui/material/colors";
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

        // button: {
        //     letterSpacing: "2px"
        // }
    },

})

export const getPallete = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                // primary: amber,
                // divider: amber[200],
                // text: {
                //     primary: grey[900],
                //     secondary: grey[800],
                // },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                // divider: deepOrange[700],
                background: {
                    // default: deepOrange[900],
                    // paper: deepOrange[900],
                    
                },

                text: {
                    primary: '#fff',
                    secondary: grey[500],
                    // brandLight: deepOrange[100],
                    // brandPrimary: deepOrange[500],
                    // brandDark: deepOrange[900],
                },
            }),
    },
})