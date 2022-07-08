import React, { useState, Fragment } from 'react';
import { Navbar, Nav, Container, Sidebar, Sidenav, Content, Header, Button } from 'rsuite';

import { Media, Off, ArrowRight, ArrowLeft, Dashboard, Gear, UserBadge, List } from '@rsuite/icons';

const Login = ({ setKey }) => {
    return <Fragment>
        <Header>
            <h2>SignIn?</h2>
            <Button onClick={() => setKey('1')}>Login</Button>
        </Header>
        <Content>Have account?
            <Button onClick={() => setKey('5')}>SignUp</Button>
        </Content>
    </Fragment>

}
export default Login;