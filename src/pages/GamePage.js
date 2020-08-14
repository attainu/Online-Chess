import React, { Component } from "react";
import Board from "../components/Board";
import { Row, Button, Col } from "react-bootstrap";
import MovesList from "../components/MovesList";
import {connect} from 'react-redux'
import Chessboard from 'chessboardjsx'
class GamePage extends Component {
  render() {
    return (
      <Row className="justify-content-center py-5" id="jumbotron">
        <div className="col-auto" style={{border: "5px solid #342104"}}>
           
        <Board />

        </div>

        <div className="col-auto ml-5">
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


const mapStateToProps = storeState => {
    console.log("store stet", storeState)
    return {
        gameId: storeState.chessState.gameId
    }
}
export default connect(mapStateToProps)(GamePage);
