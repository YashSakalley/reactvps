import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Report from './pages/Report'
import Sho from './components/OfficerLogin/Sho'
import ShoDashboard from './pages/Dashboard/Sho'

export default function AppRouter() {
    return (
        <Switch>

            <Route path="/submitReport">
                <Report />
            </Route>

            <Route path="/sho/dashboard">
                <ShoDashboard />
            </Route>

            <Route path="/sho">
                <Sho />
            </Route>

            <Route path="/">
                <Landing />
            </Route>

        </Switch>
    )
}
