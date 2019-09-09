import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
//import { NavItem } from 'react-router-bootstrap';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Navigation extends React.Component {

render() {
    return <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect='true'>
    <Navbar.Brand href="/">
      <img
        src="/images/logo.png"
        className="d-inline-block align-top"
        alt="pricekite logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav id="pricekiteNavigation" className="mr-auto">
      <LinkContainer  to='/compute'>
        <Nav.Link>Compute</Nav.Link>
      </LinkContainer>
       <LinkContainer  to='/about'>
         <Nav.Link>About</Nav.Link>
       </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
}

}
