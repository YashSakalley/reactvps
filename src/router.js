import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Report from './pages/Report'
import Login from './components/OfficerLogin/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import OfficerReport from './pages/Dashboard/Report'
import Loading from './components/Loading/Loading'


export default function AppRouter() {
    return (
        <Switch>

            <Route path='/loading'>
                <Loading />
            </Route>

            <Route path="/submitReport">
                <Report />
            </Route>

            <Route path="/dashboard/:role/:reportId">
                <OfficerReport />
            </Route>

            <Route path="/dashboard/:role">
                <Dashboard />
            </Route>

            <Route path="/login/:role">
                <Login />
            </Route>

            <Route path="/" exact>
                <Landing />
            </Route>

            <Route path="/" >
                404 not found
                <br />
                <a href="/">Click here to go home</a>
            </Route>

        </Switch>
    )
}
