import React from "react";
import { Nav, Navbar, Button, NavItem } from "react-bootstrap";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import config from "../config";
import { logOutUser } from "../redux/actions/googleAuthActions";
import styles from "../styles/header.module.css";

const Header = ({ user, logOutUser }) => {
  console.log(user);
  const history = useHistory();
  const handleLogoutFailure = (err) => {
    console.error(err);
  };

  const handleLogoutSuccess = () => {
    let path = ``;
    history.push(path);

    alert("Logged out successfully");
    logOutUser();
  };
  const routeChange = () => {
    let path = `login`;
    history.push(path);
  };
  const routeChange2 = () => {
    let path = `Register`;
    history.push(path);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link className="text-decoration-none text-white " to="/">
          <img
            alt=""
            src={require("../assets/images.png")}
            width="30"
            height="30"
            className="d-inline-block align-top  img-thumbnail "
          />{" "}
          Chess
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto   ">
          <Nav.Link className="text-white" eventKey="1" as={Link} to="/game">
            Play
          </Nav.Link>
          <Nav.Link className="text-white" eventKey="2" as={Link} to="/learn">
            Learn
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto" navbar>
          {!user ? (
            <NavItem>
              <Button className="mr-5" variant="info" onClick={routeChange}>
                Login/SignUp
              </Button>
              {/* <Button className="mr-5" variant="info"  onClick={routeChange2}   >
                SignUp
              </Button> */}
            </NavItem>
          ) : (
            <>
              <NavItem className="mr-auto ">
                <Link
                  className=" text-decoration-none text-white mr-5   "
                  to="/Messages"
                >
                  Messages
                </Link>
                <Link
                  className=" text-decoration-none text-white mr-5"
                  to="/profile"
                >
                  Profile
                </Link>

                <GoogleLogout
                  clientId={config.CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={handleLogoutSuccess}
                  onFailure={handleLogoutFailure}
                  theme="dark"
                />
              </NavItem>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = (storeState) => {
  return {
    user: storeState.googleAuthState.user,
  };
};

export default connect(mapStateToProps, { logOutUser })(Header);
