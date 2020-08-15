import React, { Component } from "react";
import Board from "../components/Board";
import { Row, Button, Col } from "react-bootstrap";
import MovesList from "../components/MovesList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { abortGame, resignGame } from "../redux/actions/chessActions";

class GamePage extends Component {
  render() {
    const gameId = this.props.match.params.gameId;

    return (
      <Row className="justify-content-center py-5" id="jumbotron">
        <div className="col-auto" style={{ border: "5px solid #342104" }}>
          <Board />
        </div>

        <div className="col-auto ml-5">
          <MovesList />
          <Row>
            <Button
              onClick={() =>
                this.props.abortGame(gameId, this.props.currenPlayer)
              }
              style={{ marginRight: 20 }}
            >
              Abort
            </Button>
            <Button
              onClick={() =>
                this.props.resignGame(gameId, this.props.currentPlayer)
              }
            >
              Resign
            </Button>
          </Row>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (storeState) => {
  console.log("store stet", storeState);
  return {
    gameId: storeState.chessState.gameId,
    currenPlayer: storeState.chessState.currenPlayer,
  };
};
export default connect(mapStateToProps, { abortGame, resignGame })(
  withRouter(GamePage)
);
