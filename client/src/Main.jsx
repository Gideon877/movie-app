import React, { useState, Fragment } from 'react';

import { Navbar, Nav, Container, Sidebar, Sidenav, Content, Header } from 'rsuite';

import { Media, Off, ArrowRight, ArrowLeft, Dashboard, Gear, UserBadge, List } from '@rsuite/icons';
import Home from './components/home/Home';
import Playlist from './components/playlist/Playlist';
import User from './components/user/User';
import { Login, SignUp } from './components/auth/index';



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


const Main = () => {
    const [expand, setExpand] = useState(true);
    const [eventKey, setKey] = useState('1');
    console.log({ eventKey })

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expand ? 260 : 56}
                    collapsible
                >
                   {eventKey < 4 && <Sidenav.Header>
                        <div style={headerStyles}>
                            <Media style={{ fontSize: 20 }} />
                            <span style={{ marginLeft: 12 }}> Dintshantsho</span>
                        </div>
                    </Sidenav.Header>}
                    <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
                        <Sidenav.Body>
                            <Nav>
                                {(eventKey < 4)
                                    ? (<Fragment>
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


                                    </Fragment>)
                                    : ""
                                }
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                </Sidebar>

                <Container>

                    {(eventKey < 4)

                        ?
                        <Fragment>{(eventKey === '1') && <Home />}
                            {(eventKey === '2') && <Playlist />}
                            {(eventKey === '3') && <User />}
                        </Fragment>

                        : <Fragment>
                            {(eventKey === '4') && <Login setKey={setKey} />}
                            {(eventKey === '5') && <SignUp setKey={setKey} />}
                        </Fragment>
                    }

                </Container>
            </Container>
        </div >
    );
};


export default Main;

// <Header>
// <h2>Page Title</h2>
// </Header>
// <Content>Content</Content>