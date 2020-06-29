import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Fir from './pages/Fir'

export default function AppRouter() {
    return (
        <Switch>

            <Route path="/fir">
                <Fir />
            </Route>

            <Route path="/">
                <Landing />
            </Route>

        </Switch>
    )
}
