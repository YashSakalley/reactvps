import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import Cookies from 'js-cookie'

const Auth = (WrappedComponent) => {
    console.log('Wrapper');
    class AuthHOC extends Component {
        render() {
            const token = Cookies.get('token')
            return !token ? <Redirect to='/' /> : <WrappedComponent />
        }
    }
    return withRouter(AuthHOC);
}

export default Auth