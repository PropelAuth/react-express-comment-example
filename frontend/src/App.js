import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Grid from "@mui/material/Grid"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import logo from "./logo.png"
import Comments from "./components/Comments"
import CreateComment from "./components/CreateComment"
import AuthenticationButtons from "./components/AuthenticationButtons"

const theme = createTheme({
    palette: {
        primary: {
            main: "#607d8b",
        },
    },
})

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <div style={{flex: 1}}>
                        <img src={logo} height={50} width={150} alt="logo" />
                    </div>
                    <AuthenticationButtons />
                </Toolbar>
            </AppBar>
            <Container>
                <Box p={2}>
                    <Comments />
                    <CreateComment />
                </Box>
            </Container>
        </ThemeProvider>
    )
}
