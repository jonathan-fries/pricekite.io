import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class RbNavBar extends React.Component {

render() {
    return <Navbar bg="dark">
    <Navbar.Brand href="#home">
      <img
        src="/images/pricekite_combined_logo_transparent_alt_2.png"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/about">About</Nav.Link>
    </Nav>
  </Navbar>;
}

}
