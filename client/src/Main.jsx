import React, { useState, Fragment } from 'react';

import { Navbar, Nav, Container, Sidebar, Sidenav, Content, Header } from 'rsuite';

import { Media, Off, ArrowRight, ArrowLeft, Dashboard, Gear, UserBadge, List } from '@rsuite/icons';
import Home from './components/home/Home';
import Playlist from './components/playlist/Playlist';
import User from './components/user/User';
import { Login, SignUp } from './components/auth/index';
import BarItem from './components/menu/BarItems';




const Main = () => {
    const [eventKey, setKey] = useState('1');

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                {eventKey < 4 && <BarItem eventKey={eventKey} setKey={setKey} isLoggedIn={true} />}
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