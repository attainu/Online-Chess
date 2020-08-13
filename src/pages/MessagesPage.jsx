import React from 'react'
import {ListGroup, Container} from 'react-bootstrap'
import {Link } from 'react-router-dom'

const MessagesPage = () => {
    return (
        <Container fluid className="d-flex justify-content-center mt-3 w-100 ">
           
            <ListGroup className="messages  mb-5 w-75 " >
            <h1> <b>Chat Page <hr/> </b>  </h1> 
           
  <Link>  <ListGroup.Item variant="light">first</ListGroup.Item></Link> 
  <Link><ListGroup.Item variant="dark">Second</ListGroup.Item></Link> 
  <Link> <ListGroup.Item variant="light">third</ListGroup.Item></Link> 
  <Link><ListGroup.Item variant="dark">fourth</ListGroup.Item></Link> 
  <Link><ListGroup.Item variant="light">fifth</ListGroup.Item></Link> 
  <Link> <ListGroup.Item variant="dark">sixth</ListGroup.Item></Link>
  <Link> <ListGroup.Item variant="light">seventh</ListGroup.Item></Link> 
  <Link><ListGroup.Item variant="dark">Eighth</ListGroup.Item></Link> 
  
  
 
  
  
 
 
</ListGroup>
            
        </Container>
    )
}

export default MessagesPage
