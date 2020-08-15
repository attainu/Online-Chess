import React, { Component } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateGame from "./CreateGame";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/authAction";
import { auth, generateUserDocument } from "../firebase";

class Header extends Component {
  state = {
    show: false,
  };

  async componentDidMount() {
    auth.onAuthStateChanged(async (userAuth) => {
      const user = await generateUserDocument(userAuth);
      console.log("user login", user);
      this.props.setUser(user);
    });
  }

  handleClose = () => {
    this.setState((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  handleShow = () => {
    this.setState((prevState) => ({
      prevState,
      show: true,
    }));
  };

  handleClick = () => {
    console.log("clicked");
    this.setState((prevState) => ({
      ...prevState,
      show: true,
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
            <Nav.Link href="#link">Learn</Nav.Link>
          </Nav>
          {this.props.user ? (
            <>
              <h6>
                <span>Logged in as: </span>
              </h6>
              <label>{this.props.user.displayName}</label>
              <Button className="mr-5 ml-2" variant="primary">
                Logout
              </Button>
            </>
          ) : (
            <Button className="mr-5" variant="primary">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/login"
              >
                {" "}
                Login
              </Link>
            </Button>
          )}
        </Navbar.Collapse>
        <CreateGame
          show={this.state.show}
          handleClose={this.handleClose}
          handleShow={this.handleShow}
        />
      </Navbar>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    user: storeState.authState.user,
  };
};

export default connect(mapStateToProps, { setUser })(Header);
