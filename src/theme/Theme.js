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

                background: {
                    default: "fff",
                    // TODO
                    secondary: "#d9d9d9",
                  
                    // paper: "#242424" // default_light

                },

                loader: {
                    main: '#ffffff',
                },

            }
            : {
                // TODO
                // palette values for dark mode
                primary: deepOrange,
                // divider: deepOrange[700],
                background: {
                    // default: deepOrange[900],
                    // TODO
                    secondary: "#242424",
                  
                    paper: "#242424" // default_light

                },

                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
                loader: {
                    main: '#000000',
                },
            }),
    },
    typography: {
        // fontSize: 20, // Global size
        // fontFamily: "Russo One",
        h1: { fontFamily: "Russo One" },
        h2: { fontFamily: "Russo One" },
        h3: { fontFamily: "Russo One" },
        h4: { fontFamily: "Russo One" },
        h5: { fontFamily: "Russo One" },
        h6: { fontFamily: "Russo One" },

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