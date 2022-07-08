import React, { useState, Fragment } from 'react';
import { Navbar, Nav, Container, Sidebar, Sidenav, Content, Header } from 'rsuite';

import { Media, Off, ArrowRight, ArrowLeft, Dashboard, Gear, UserBadge, List } from '@rsuite/icons';


const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};


const NavToggle = ({ expand, onChange }) => {
    return (
        <Navbar appearance="subtle" className="nav-toggle">
            <Navbar.Body>

                <Nav pullRight>
                    <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                        {expand ? <ArrowLeft /> : <ArrowRight />}
                    </Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    );
};


const BarItem = ({ isLoggedIn, eventKey, setKey }) => {
    const [expand, setExpand] = useState(true);

    return (<Sidebar
        style={{ display: 'flex', flexDirection: 'column' }}
        width={expand ? 260 : 56}
        collapsible
    >
        <Sidenav.Header>
            <div style={headerStyles}>
                <Media style={{ fontSize: 20 }} />
                <span style={{ marginLeft: 12 }}> Dintshantsho</span>
            </div>
        </Sidenav.Header>
        <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
                <Nav>

                    <Nav.Item eventKey="1" onClick={() => setKey('1')} active={eventKey === '1'} icon={<Dashboard />}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item onClick={() => setKey('2')} eventKey="2" active={eventKey === '2'} icon={<List />}>
                        Playlist
                    </Nav.Item>

                    <Nav.Item eventKey="3" onClick={() => setKey('3')} active={eventKey === '3'} icon={<UserBadge />}>
                        Gideon877
                    </Nav.Item>

                    {/**<Nav.Menu
                        eventKey="4"
                        trigger="hover"
                        title="Settings"
                        icon={<Gear />}
                        placement="rightStart"
                    >
                        <Nav.Item eventKey="4-1">Applications</Nav.Item>
                        <Nav.Item eventKey="4-2">Websites</Nav.Item>
                        <Nav.Item eventKey="4-3">Channels</Nav.Item>
                        <Nav.Item eventKey="4-4">Tags</Nav.Item>
                        <Nav.Item eventKey="4-5">Versions</Nav.Item>
                    </Nav.Menu>*/}


                    <Nav.Item onClick={() => setKey('4')} eventKey="4" active={eventKey === '4'} icon={<Off />}>
                        Logout
                    </Nav.Item>




                </Nav>
            </Sidenav.Body>
        </Sidenav>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
    </Sidebar>
    );
}

export default BarItem;