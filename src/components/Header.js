import React from "react";
import {
    Nav,
    Navbar,
    Button, 
    NavItem,
     
  } from "react-bootstrap";
  import { connect } from "react-redux";

  import {Link} from 'react-router-dom'
  import { GoogleLogout } from "react-google-login";
  // import history from './history';
  import { useHistory } from "react-router-dom";
  import config from "../config";
 import { logOutUser } from '../redux/actions/googleAuthActions'



const Header=({ user, logOutUser }) => {
  console.log(user);
  const history = useHistory();
    const handleLogoutFailure = err => {
        console.error(err);
      };
    
      const handleLogoutSuccess = () => {
        let path = `Login`; 
        history.push(path);
      
       
       
        alert("Logged out successfully");
        logOutUser();
       
       
        
      };
      const routeChange = () =>{ 
        let path = `login`; 
        history.push(path);
      }
    
  
 
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
              <Nav className="ml-auto" navbar>
              {!user ? (
          <NavItem>
               <Button className="mr-5" variant="outline-success"  onClick={routeChange}   >
                Login
              </Button>
          
          </NavItem>
        ) : (
          <>
          <GoogleLogout
              clientId={config.CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={handleLogoutSuccess}
              onFailure={handleLogoutFailure}
            />
          </>
        )}
          </Nav>
             
            </Navbar.Collapse>
          </Navbar>
       
    );
  
}
const mapStateToProps = storeState => {
  return {
    user: storeState.googleAuthState.user
  };
};

export default connect(mapStateToProps, { logOutUser })(Header);


