import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <Container fluid style={{ backgroundColor: "#343A40" }}>
        <Row className="justify-content-center p-2">
          <img src="" alt="in"></img>
          <img src="" alt="tw"></img>
          <img src="" alt="fb"></img>
        </Row>
        <Row className="justify-content-center">
          <p style={{ color: "white" }}>&copy; 2020 Online Chess</p>
        </Row>
      </Container>
    );
  }
}

export default Footer;
