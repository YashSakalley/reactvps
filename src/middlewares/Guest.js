import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { withRouter, Redirect } from 'react-router-dom';

export default function Guest(WrappedComponent) {
    class GuestHOC extends Component {
        render() {
            const token = Cookies.get('token');
            return token ? <Redirect to="/" /> : <WrappedComponent />;
        }
    }

    return withRouter(GuestHOC);
}