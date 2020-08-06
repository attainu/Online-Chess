import React from 'react'
import { Form, Button,Container, Image } from 'react-bootstrap'
import Email from '../images/Email.svg'
import key from '../images/key.svg'
import send from '../images/Send.svg'

import { Link } from 'react-router-dom' 

const Login = () => {
    return (

        <Container fluid className="d-flex justify-content-center mt-5 w-100 ">
                <Form className=" text-center  mt-5  " >
            <h1> <b>LOGIN</b> </h1>
                    <Form.Group controlId="formBasicEmail" className="d-inline-flex w-100 mt-5 " >
                     <Form.Label className="align-bottom mr-2"  > <Image src={ Email } alt="Email-icon" className="mt-2"   /> </Form.Label>
                    <Form.Control    type="email" placeholder="Enter email"/>
                       
          </Form.Group>
        <Form.Text className="text-muted ">
      (We'll never share your email with anyone else.)
         </Form.Text>

  <Form.Group controlId="formBasicPassword"  className="d-inline-flex w-100 mt-5 "  >
    <Form.Label  className="align-bottom mr-2"  > <Image src={ key } alt="password-icon"  className="mt-2"  /></Form.Label>
    <Form.Control type="password" placeholder="Password" />
    
  </Form.Group>
  <Form.Check type="checkbox" label="Remember me" className="text-muted " />
  
    
  
  <Button   className="w-75 mt-5 mb-5 "  variant="primary " type="submit">
  
    LOGIN
    <Image className="ml-3 " src={ send } alt="Email-icon"  />
  </Button>
  <Link className="d-block align-center " to='/Register'>New user? Register now</Link>


      </Form>



        </Container>
        
        
    )
}
    

export default Login
