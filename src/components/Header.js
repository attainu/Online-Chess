import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Navbar id="jumbotron">
        <Navbar.Brand>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
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
            <Nav.Link style={{ fontWeight: "bold" }}>Play</Nav.Link>
            <Nav.Link style={{ fontWeight: "bold" }} href="#link">
              Learn
            </Nav.Link>
          </Nav>
          <div className="notification">
            <i className="fas fa-bell"></i>
            <span className="counter counter-lg">1</span>&nbsp;&nbsp;
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
