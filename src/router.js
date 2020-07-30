import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Report from './pages/Report'
import Login from './components/OfficerLogin/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import OfficerReport from './pages/Dashboard/Report'
import Loading from './components/Loading/Loading'
import Canvas from './components/Canvas'
import Chart from './pages/Dashboard/Chart'
import WithoutAadhaar from './components/Home/WithoutAadhaar'
import Volunteer from './pages/Volunteer'
import VolLogin from './components/Volunteer/VolLogin'
import VolContent from './components/Volunteer/VolContent'


export default function AppRouter() {
    return (
        <Switch>

            <Route path='/test'>
                <Canvas />
            </Route>

            <Route path='/loading'>
                <Loading />
            </Route>

            <Route path="/volunteer/login">
                <VolLogin />
            </Route>

            <Route path='/volunteer/:requestId'>
                <VolContent />
            </Route>

            <Route path='/volunteer'>
                <Volunteer />
            </Route>

            <Route path="/submitReport">
                <Report />
            </Route>

            <Route path='/chart/dashboard/:role/'>
                <Chart />
            </Route>

            <Route path="/dashboard/:role/:reportId">
                <OfficerReport />
            </Route>

            <Route path="/dashboard/:role">
                <Dashboard />
            </Route>

            <Route path="/loginWithoutUid">
                <WithoutAadhaar />
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
