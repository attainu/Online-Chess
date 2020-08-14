import React, { Component } from "react";
import {
  Button,
  Jumbotron,
  Container,
  Table,
  Col,
  Row,
  Card,
} from "react-bootstrap";

class HomePage extends Component {
  render() {
    return (
      <div className="App pb-5" id="jumbotron">
        <Jumbotron fluid id="jumbotron">
          <Container>
            <Row>
              <Col lg={6}>
                <h1>Online Chess</h1>
                <p>Play chess with your friends.</p>
                <p>
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs. The passage
                  is attributed to an unknown typesetter in the 15th century who
                  is thought to have scrambled parts of Cicero's De Finibus
                  Bonorum et Malorum for use in a type specimen book.
                </p>
                <Button>Play Now</Button>
              </Col>
              <Col lg={1} />
              <Col lg={5} >
                <img
                  src={require("../assets/chessanimated.gif")}
                  style={{ height: 450, width: 450 }}
                  alt="dd"
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <hr />
        <Container>
          <Row className="justify-content-center">
            <h3 className="mt-5 mb-5">Top FIDE Players</h3>
            <Table striped bordered hover style={{ backgroundColor: "white" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Title</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Carlsen, Magnus</td>
                  <td>Norway</td>
                  <td>GM</td>
                  <td>2863</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Caruana, Fabiano</td>
                  <td>USA</td>
                  <td>GM</td>
                  <td>2835</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ding, Liren</td>
                  <td>China</td>
                  <td>GM</td>
                  <td>2791</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Nepomniachtchi, Ian</td>
                  <td>Russia</td>
                  <td>GM</td>
                  <td>2784</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Vachier-Lagrave, Maxime</td>
                  <td>France</td>
                  <td>GM</td>
                  <td>2778</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Grischuk, Alexander</td>
                  <td>Russia</td>
                  <td>GM</td>
                  <td>2777</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Aronian, Levon</td>
                  <td>Armeia</td>
                  <td>GM</td>
                  <td>2773</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>So, Wesley</td>
                  <td>USA</td>
                  <td>GM</td>
                  <td>2770</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Radjabov, Teimour</td>
                  <td>Azerbaijan</td>
                  <td>GM</td>
                  <td>2765</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Anish Giri</td>
                  <td>Netherlands</td>
                  <td>GM</td>
                  <td>2764</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
