import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import Cookies from 'js-cookie'

export default function Auth(WrappedComponent) {
    class AuthHOC extends Component {
        render() {
            const token = Cookies.get('token')
            return token === null ? <Redirect to='/#login-section' /> : <WrappedComponent />
        }
    }
    return withRouter(AuthHOC);
}
