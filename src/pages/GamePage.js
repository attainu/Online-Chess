import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";
import MovesList from "../components/MovesList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resignGame } from "../redux/actions/userActions";
import Board from "../components/Board";
import {
  fetchFromLocalAndStoreInRedux,
  resetLocalStorage,
} from "../helpers/localStorageHelper";
class GamePage extends Component {
  constructor() {
    super()
   
      if (window.performance) {
        if (performance.navigation.type === 1) {
          console.log("page was reloaded");
          const localGameStatus = localStorage.getItem("status");
  
          if (localGameStatus !== "started") {
            //reset everything from localStorage
            resetLocalStorage();
          }
          //check if localstorage's game id matches game id
          const localGameId = localStorage.getItem("gameId");
          if (localGameId === gameId && localGameStatus === "started") {
            //fetch from localstorage and store in redux
            fetchFromLocalAndStoreInRedux();
          }
        } else {
          console.log("page was not reloaded");
        }
      }
  
  }
  render() {
    const gameId = this.props.match.params.gameId;
    console.log("flip board", this.props.flipBoard);
    return (
      <Row
        className="justify-content-center align-items-center py-5"
        id="jumbotron"
      >
        <div
          className={
            this.props.flipBoard
              ? "col-auto d-flex flex-column-reverse"
              : "col-auto"
          }
        >
          <Board />
        </div>

        <div className="col-auto ml-5">
          <MovesList />
          <Row>
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
  return {
    gameId: storeState.chessState.gameId,
    currenPlayer: storeState.chessState.currenPlayer,
    flipBoard:
      storeState.chessState.user !== null &&
      storeState.chessState.black !== null &&
      storeState.chessState.black.toLowerCase() ===
        storeState.chessState.user.toLowerCase(),
  };
};
export default connect(mapStateToProps, { resignGame })(withRouter(GamePage));
