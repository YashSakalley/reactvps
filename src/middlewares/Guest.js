import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { withRouter, Redirect } from 'react-router-dom';

const Guest = (WrappedComponent) => {
    class GuestHOC extends Component {
        render() {
            const token = Cookies.get('token');
            return token ? <Redirect to="/" /> : <WrappedComponent />;
        }
    }

    return withRouter(GuestHOC);
}

export default Guest