import React, { useState, Fragment } from 'react';
import { Navbar, Nav, Container, Sidebar, Sidenav, Content, Header } from 'rsuite';

import { Media, Off, ArrowRight, ArrowLeft, Dashboard, Gear, UserBadge, List } from '@rsuite/icons';

const User = () => {
    return <Fragment>
        <Header>
            <h2>Profile</h2>
        </Header>
        <Content>John Smith</Content>
    </Fragment>

}
export default User;