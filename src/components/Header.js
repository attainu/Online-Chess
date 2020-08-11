import React, { Component } from "react";
import {
    Nav,
    Navbar,
    Button,   
  } from "react-bootstrap";
  import {Link} from 'react-router-dom'

class Header extends Component {
  render() {
    return (
     
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand ><Link to="/">
              <img
                alt=""
                src={require("../assets/images.png")}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Chess
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Play</Nav.Link>
                <Nav.Link href="#link">Learn</Nav.Link>
              </Nav>
              <Button className="mr-5" variant="outline-success">
                Login
              </Button>
            </Navbar.Collapse>
          </Navbar>
       
    );
  }
}

export default Header;
