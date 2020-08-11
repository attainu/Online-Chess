import React, { Component } from "react";
import {
    Button,
    Jumbotron,
    Container,
    Col,
    Row,
    Card,
  } from "react-bootstrap";


class HomePage extends Component {
  render() {
    return (
      <>
        <Jumbotron fluid>
          <Container>
            <h1>Online Chess</h1>
            <p>Play chess with your friends.</p>
          </Container>
        </Jumbotron>
        <div>
          <h1>Play</h1>
          <p>Challenge a random player or play with your friends</p>
        </div>
        <Row className="justify-content-center mb-5">
          <Col className="col-lg-4">
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Random</Card.Title>
                <Card.Text>Seek and challenge a random player.</Card.Text>
                <Button variant="primary">Play</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-lg-4">
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Friends</Card.Title>
                <Card.Text>Play with your friends.</Card.Text>
                <Button variant="primary">Play</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default HomePage;
