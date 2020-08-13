import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import { Form, Button,Container, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import Email from '../images/Email.svg'
import key from '../images/key.svg'
import send from '../images/Send.svg'



import GoogleLoginPage from '../components/GoogleLoginPage';

import { Link } from 'react-router-dom' 

import { login } from '../redux/actions/authAction';

class Login extends Component {
  state = {
    email: '',
    password: ''
}
login(e) {
    e.preventDefault(); 
    this.props.login(this.state, this.props.users);
}

        render() {
     
    return (

        <Container fluid className="d-flex justify-content-center mt-3 w-100 h-100 ">
          {this.props.isAuthenticated? <Redirect to='/Home'/>: ''}
                <Form onSubmit={(e) => this.login(e)} className=" text-center  mt-5  " >
            <h1> <b>LOGIN</b> </h1>
                    <Form.Group controlId="formBasicEmail" className="d-inline-flex w-100 mt-5 " >
                     <Form.Label className="align-bottom mr-2"  > <Image src={ Email } alt="Email-icon" className="mt-2"   /> </Form.Label>
                    <Form.Control    type="email" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value})}/>
                       
          </Form.Group>
     

  <Form.Group controlId="formBasicPassword"  className="d-inline-flex w-100 mt-3 "  >
    <Form.Label  className="align-bottom mr-2"  > <Image src={ key } alt="password-icon"  className="mt-2"  /></Form.Label>
    <Form.Control type="password" placeholder="Password" autoComplete="on"   onChange={(e) => this.setState({password: e.target.value})} />
    
  </Form.Group>
  <Form.Check type="checkbox" label="Remember me" className="text-muted " />
  
    
  
  <Button   className="w-75 mt-3 mb-5 "  variant="primary " type="submit">
  
    LOGIN
    <Image className="ml-3 " src={ send } alt="Email-icon"  />
  </Button>
 
<Form.Text className="text-muted mb-2" >OR SIGN IN USING</Form.Text>

 

<GoogleLoginPage/>
<Link className="d-block align-center mt-3 " to='/Register'>New user? Register now</Link>


      </Form>

     


        </Container>
        
        
    )
        }
}
const mapStateToProps = (reducState) => {
  let state = reducState.authState
  return {
      users: state.users,
      isAuthenticated: state.isAuthenticated
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
      login: (userCreds, userArray) => dispatch(login(userCreds, userArray))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)
    


