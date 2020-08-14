import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateGame from './CreateGame'

class Header extends Component {
  state = {
    show: false
  };

  handleClose = () => {
    this.setState(prevState => ({
      ...prevState,
      show: false,
    }));
  };
  handleShow = () => {
    this.setState(prevState => ({
      prevState,
      show: true,
    }));
  };

  handleClick = () => {
    console.log("clicked");
    this.setState((prevState) => ({
      ...prevState,
      show: true
    }));
  };

  render() {
    return (
      <Navbar id="jumbotron">
        <Navbar.Brand>
          <Link to="/">
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
            <Nav.Link onClick={this.handleClick}>Play</Nav.Link>
            <Nav.Link  href="#link">Learn</Nav.Link>
          </Nav>
          <Button className="mr-5" variant="primary">
            Login
          </Button>
        </Navbar.Collapse>
        <CreateGame show={this.state.show} handleClose={this.handleClose} handleShow={this.handleShow} />
      </Navbar>
    );
  }
}

export default Header;
