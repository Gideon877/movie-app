import React, { useState, Fragment } from 'react';
import { Navbar, Nav, Container, Sidebar, Sidenav, Content, Header, Button } from 'rsuite';

import { Media, Off, ArrowRight, ArrowLeft, Dashboard, Gear, UserBadge, List } from '@rsuite/icons';

const Login = ({ setKey }) => {
    return <Fragment>
        <Header>
            <h2>SignUp?</h2>
        </Header>
        <Content>Dont Have account?
            <Button onClick={() => setKey('4')}>SignIn</Button>

        </Content>
    </Fragment>

}
export default Login;