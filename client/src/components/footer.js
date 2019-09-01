import React from 'react';
import style from './footer.scss';
import Navbar from 'react-bootstrap/Navbar';

export default class Header extends React.Component {

    render() {
        return <Navbar fixed="bottom" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <span>© 2019 by Jonathan Fries</span>
        </Navbar.Brand>
        </Navbar>
    }

}
