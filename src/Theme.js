import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    fontFamily: "Verdana",
    palette: {
        primary: {
            main: "#37474f"
        },
        secondary: {
            main: "#a1887f"
        },
        // type: 'dark',
    },
    // typography: {
    //     fontFamily: "",
    // }
})

const Theme = props => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default Theme;
