import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import lightTheme from 'theme/lightTheme'
import AppRouter from './router'

const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <Router>
                <AppRouter />
            </Router>
        </ThemeProvider>
    )
}

export default App