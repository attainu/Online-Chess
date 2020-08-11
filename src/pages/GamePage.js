import React, { Component } from "react";
import Board from "../components/Board";
import { Row, Button, Col } from "react-bootstrap";
import MovesList from "../components/MovesList";

class GamePage extends Component {
  render() {
    return (
      <Row className="justify-content-center">
        <div className="col-auto">
          <Board />
        </div>

        <div className="col-auto">
          <MovesList />
          <Row>
            <Button style={{marginRight: 20}}>Abort</Button>
            <Button>Resign</Button>
          </Row>
        </div>
      </Row>
    );
  }
}

export default GamePage;
