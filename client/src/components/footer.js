import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default class Header extends React.Component {

    render() {
        return <Navbar fixed="bottom" bg="dark" variant="dark">
        <Navbar.Brand>
          <a href="https://jonathanfries.net"><span>© 2019 by Jonathan Fries</span></a><span>   Current version - v 0.6.0</span>
        </Navbar.Brand>
        </Navbar>
    }

}
