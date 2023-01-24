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
                // TODO
                // palette values for light mode
                // primary: amber,
                // divider: amber[200],
                // text: {
                //     primary: grey[900],
                //     secondary: grey[800],
                // },
            }
            : {
                // TODO
                // palette values for dark mode
                primary: deepOrange,
                // divider: deepOrange[700],
                background: {
                    // default: deepOrange[900],
                    // TODO
                    // paper: "#291b00" // Orange tinge
                    // paper: "#050029" // blue tinge
                    // paper: "#290000" // red tinge
                    paper: "#242424" // default_light
                    // paper: "#121212" // default

                },

                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
    typography: {
        // fontSize: 20, // Global size
        h6: {
            fontFamily: "Russo One",
            // fontSize: 10 // Specific size
        },

        // ...(mode === "light") && {
        //     button: {
        //         color: "black"
        //     }
        // },
        // TODO - button text is not visible in light mode
        button: {
            // fontFamily: "Russo One",
        }
      },
})