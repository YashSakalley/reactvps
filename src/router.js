import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Report from './pages/Report'
import Login from './components/OfficerLogin/Login'
import Dashboard from './pages/Dashboard/Dashboard'

export default function AppRouter() {
    return (
        <Switch>

            <Route path="/submitReport">
                <Report />
            </Route>

            <Route path="/dashboard/:role">
                <Dashboard />
            </Route>

            <Route path="/login/:role">
                <Login />
            </Route>

            <Route path="/">
                <Landing />
            </Route>

        </Switch>
    )
}
